import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import * as api from './../../Utils/callapi';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import HttpsSharpIcon from '@material-ui/icons/HttpsSharp';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
class BookItem extends Component {
    state = { 
        item : {
            id: "",
            subject: "",
            barcode : "",
            price: "",
            format:"",
            status:"",
            rack:"",

        },
        borroweddate : "",
        duedate: "",

     }

     componentDidMount(){
         var {item,book} = this.props;
         this.setState({
             item : {
                 id:item.id,
                 subject:book.subject,
                 barcode: item.barcode,
                 price: item.price,
                 format: item.format,
                 status: item.status,
                 rack: item.rack.number,
             },
             borroweddate : item.borrowed,
             duedate: item.dueDate,
         })
     }
     componentWillReceiveProps(nextProps){
         if(nextProps){
            var {item,book} = nextProps;
            this.setState({
                item : {
                    id:item.id,
                    subject:book.subject,
                    barcode: item.barcode,
                    price: item.price,
                    format: item.format,
                    status: item.status,
                    rack: item.rack.number,
                },
                borroweddate : item.borrowed,
                duedate: item.dueDate,
            })
         }

     }
     onChangeDate = (e) =>{
        var name = e.target.name;
        var value = e.target.value;
        this.setState({
            [name] : value
        })


     }
     ChuyenDoi =(n) =>{
        if(n <= 9) return `0${n}`;
        else return n;
     }

    onRegister = () =>{
        var {borroweddate,duedate} = this.state;
        if(borroweddate === "" || duedate === ""){
            alert("b???n c???n ??i???n ?????y ????? th??ng tin")
        }
        else{
       var t = window.confirm("b???n c?? ch???c ch???n mu???n ????ng k?? m?????n s??ch ch???");
       if ( t) {
        // kh???i t???o ng??y hi???n t???i
        var d = new Date();
        var day = d.getDate();
        var date = `${d.getFullYear()}-${this.ChuyenDoi(d.getMonth() + 1)}-${this.ChuyenDoi(day)}`;
        
        // c???p nh???t l???i user , ng??y m?????n , ng??y tr??? , c???a ?????i t?????ng BookItem
        var user = JSON.parse(localStorage.getItem("user"));
        var data = this.props.item;
        data.user = user;
        data.status = "RESERVED";
        data.borrowed = borroweddate;
        data.dueDate = duedate;
        data.modifiedDate = date;

        // l???y ra t??ng tin c???a id_token n???m tr??n localStore;
        var token = JSON.parse(localStorage.getItem("id_token"));
        var reader = localStorage.getItem("reader");
        // ki???m tra xem id_token v?? reader cps h???p l??? hay kh??ng , n???u kh??ng h???p l??n th?? cho v??? login ????? c???p nh???t l???i gi?? tr???

        if(token !== null){
            if(reader === "khongco"){
                alert("b???n ch??a c???p nh???t th??ng tin t??i kho???n, m???i b???n c???p nh???t th??ng tin tr?????c khi m?????n")
                this.props.history.push("/profile")
            }
            else{
                // ng?????c l???i n???u id_token v?? reader th???a m??n th?? th???c hi???n g???i api ????? c???p nh???t ?????i t?????ng
                var {id_token} = token
                var Authorization = `Bearer ${id_token}`;
                api.CallApi(`book-items/${data.id}`,"put",data,Authorization)
                .then(res =>{
                    var item = res.data;
                    this.setState({
                        item : {
                                    id:item.id,
                                    barcode: item.barcode,
                                    price: item.price,
                                    format: item.format,
                                    status: item.status,
                                    rack: item.rack.number,
                                }
            
            })
             })
             // th???c hi???n t???a ?????i t????ng recever ch???ng minh cho vi???c ??a th???c hi???n ????ng k?? m?????n s??ch v?? ch??? admin duy???t

             reader = JSON.parse(localStorage.getItem("reader"));

             var data_reserver = {
                "creationDate": date,
                "status": "WAITING",
                "bookItem": data ,
                "reader": reader,
            }

            api.CallApi("book-reservations","post",data_reserver,Authorization)
            .then(res =>{
                alert("????ng k?? m?????n s??ch th??nh c??ng");
            })



            }
        
        
        }
        else{
            alert("B???n c???n ????ng nh???p ????? th???c hi???n ch???c n??ng n??y")
            this.props.history.push("/login");
        } 
       

       

    }

    }


    }
    displayButton = (status) =>{
        if(status === "AVAILABLE"){
            return <Button variant="contained" onClick={this.onRegister}  color="primary"><EventAvailableIcon/></Button>
        }
        else if(status === "LOST"){
            return <Button variant="contained" disabled><HttpsSharpIcon/></Button>

        }
        else{
            return <Button variant="contained" disabled><HourglassEmptyIcon/></Button>
        }

    }

    render() { 
        var {item} = this.state;
        console.log(this.state);
        return ( 
        <tr>
            <td title="s??? th??? t??? s??ch">{item.id}</td>
            <td title="m??n h???c">{item.subject}</td>
            <td title="c??i n??y th?? ad c??ng m??o bi???t">{item.barcode}</td>
            <td title="????y l?? gi?? thu?? m???t ng??y">{item.price}</td>
            <td title="????y l?? ?????nh d???ng t??i li???u">{item.format}</td>
            <td title="trang th??i c???a s??ch">{item.status}</td>
            <td title="t??? s??ch">{item.rack}</td>
            <td><input type="date" name = "borroweddate" value={this.state.borroweddate} onChange={this.onChangeDate} required title="ng??y m?????n s??ch"/></td>
            <td><input type="date" name = "duedate" value={this.state.duedate} onChange={this.onChangeDate} required title="ng??y tr??? s??ch"/></td>
            <td>{this.displayButton(item.status)}</td>
         </tr>  
           
         );
    }
}
 
export default BookItem;