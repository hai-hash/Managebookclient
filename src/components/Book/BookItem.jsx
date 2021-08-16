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
            alert("bạn cần điền đầy đủ thông tin")
        }
        else{
       var t = window.confirm("bạn có chắc chắn muốn đăng ký mượn sách chứ");
       if ( t) {
        // khởi tạo ngày hiện tại
        var d = new Date();
        var day = d.getDate();
        var date = `${d.getFullYear()}-${this.ChuyenDoi(d.getMonth() + 1)}-${this.ChuyenDoi(day)}`;
        
        // cập nhật lại user , ngày mượn , ngày trả , của đối tượng BookItem
        var user = JSON.parse(localStorage.getItem("user"));
        var data = this.props.item;
        data.user = user;
        data.status = "RESERVED";
        data.borrowed = borroweddate;
        data.dueDate = duedate;
        data.modifiedDate = date;

        // lấy ra tông tin của id_token nằm trên localStore;
        var token = JSON.parse(localStorage.getItem("id_token"));
        var reader = localStorage.getItem("reader");
        // kiểm tra xem id_token và reader cps hợp lệ hay không , nếu không hợp lên thì cho về login để cập nhật lại giá trị

        if(token !== null){
            if(reader === "khongco"){
                alert("bạn chưa cập nhật thông tin tài khoản, mời bạn cập nhật thông tin trước khi mượn")
                this.props.history.push("/profile")
            }
            else{
                // ngược lại nếu id_token và reader thỏa mãn thì thực hiện gọi api để cập nhật đối tượng
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
             // thực hiện tọa đối tương recever chứng minh cho việc đa thực hiện đăng ký mướn sách và chờ admin duyệt

             reader = JSON.parse(localStorage.getItem("reader"));

             var data_reserver = {
                "creationDate": date,
                "status": "WAITING",
                "bookItem": data ,
                "reader": reader,
            }

            api.CallApi("book-reservations","post",data_reserver,Authorization)
            .then(res =>{
                alert("Đăng ký mượn sách thành công");
            })



            }
        
        
        }
        else{
            alert("Bạn cần đăng nhập để thực hiện chức năng này")
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
            <td title="số thứ tự sách">{item.id}</td>
            <td title="môn học">{item.subject}</td>
            <td title="cái này thì ad cũng méo biết">{item.barcode}</td>
            <td title="đây là giá thuê một ngày">{item.price}</td>
            <td title="đây là định dạng tài liệu">{item.format}</td>
            <td title="trang thái của sách">{item.status}</td>
            <td title="tủ sách">{item.rack}</td>
            <td><input type="date" name = "borroweddate" value={this.state.borroweddate} onChange={this.onChangeDate} required title="ngày mượn sách"/></td>
            <td><input type="date" name = "duedate" value={this.state.duedate} onChange={this.onChangeDate} required title="ngày trả sách"/></td>
            <td>{this.displayButton(item.status)}</td>
         </tr>  
           
         );
    }
}
 
export default BookItem;