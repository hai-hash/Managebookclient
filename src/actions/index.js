import * as types from './../contanst/TypeActionBook';
import * as typeuser from './../contanst/TypeActionUser';
import * as typereader from './../contanst/TypeActionReader';
import * as api from './../Utils/callapi';
import * as typecategory from './../contanst/TypeActionCategory';
export const getAllBook = () =>{
    return {
        type : types.GET_ALLL_BOOK
    }
}

export const login = (username,password) =>{
    return {
        type : typeuser.LOGIN,
        username,
        password,
    }
}

export const logout = () =>{
    return {
        type : typeuser.LOGOUT
    }
}

export const getuser = () =>{
    return {
        type: typeuser.GET_USER,
    }
}

export const getBookReseOfUserCurrenRequest = (id,Authorization) =>{
    return  (dispatch) =>{

        return api.CallApi(`book-reservations?readerId.equals=${id}`,"get",null,Authorization).then(res =>{
            dispatch(getBookReseOfUserCurren(res.data))
        })

    }

}

export const getBookReseOfUserCurren = (bookreses) =>{
    return {
        type : types.GET_RESE_USERCURREN,
        bookreses ,
    }
}


export const getBookItemByIdRequest = (id) =>{
    var token = JSON.parse(localStorage.getItem("id_token"));
    var {id_token} = token
    var Authorization = `Bearer ${id_token}`;
    return (dispatch) =>{
        return api.CallApi(`book-items?id.equals=${id}`,"get",null,Authorization).then(res =>{
            dispatch(getBookItemById(res.data))
        })
    }
}

export const getBookItemById = (bookitems) =>{
    return {
        type: types.GET_BOOKITEM_BY_ID,
        bookitems,
    }
}

export const getBookItemByUserRequest = (id) =>{
    var token = JSON.parse(localStorage.getItem("id_token"));
    var {id_token} = token
    var Authorization = `Bearer ${id_token}`;
   return (dispatch) =>{
       return api.CallApi(`book-items?userId.equals=${id}`,"get",null, Authorization ).then(res =>{
           dispatch(getBookItemByUser(res.data))

       })
   }
}


export const getBookItemByUser = (bookitems) =>{
    return {
        type : types.GET_BOOKITEM_BY_USER,
        bookitems,
    }

}

export const updateStatusInBookReseRequest = (id,bookrese) =>{
    var token = JSON.parse(localStorage.getItem("id_token"));
    var {id_token} = token
    var Authorization = `Bearer ${id_token}`;
    return (dispatch) =>{
        return api.CallApi(`book-reservations/${id}`,"put",bookrese,Authorization).then(res =>{
            dispatch(updateStatusInBookRese(res.data))
        })
    }
}

export const updateStatusInBookRese = (bookrese) =>{
    return {
        type : types.UPDATE_STATUS_BOOKRESE,
        bookrese,
    }

}

export const getAllBookItemRequest = (Authorization) =>{
    return (dispatch) =>{
        return api.CallApi("book-items","get",null,Authorization).then(res =>{
            dispatch(getAllBookItem(res.data));
        })
    }
}

export const getAllBookItem = (bookItems) =>{
    return {
        type: types.GET_ALL_BOOKITEM,
        bookItems,
    }
}


export const DeleteBookReseByIdRequest = (id) =>{
    var token = JSON.parse(localStorage.getItem("id_token"));
    var {id_token} = token
    var Authorization = `Bearer ${id_token}`;
    return (dispatch) =>{
        return api.CallApi(`book-reservations/${id}`,'delete',null,Authorization).then(res =>{
            dispatch(DeleteBookReseById(id))
        })
    }
}


export const DeleteBookReseById = (id) =>{
    return {
        type : types.DELETE_BOOKRESE_BY_ID,
        id,

    }
}


export const GetReaderCurrenRequest = (id_token) =>{
    return (dispatch) =>{
        return api.CallApi("readers/UserCurrentUser","get",null,id_token).then(res =>{
            if(res.data.length > 0){
            localStorage.setItem("reader",JSON.stringify(res.data[0]));
            dispatch(GetReaderCurren(res.data[0]));
        }
        else{
            localStorage.setItem("reader","khongco");
        }
        })
    }
}


export const GetReaderCurren = (readers) =>{
    console.log("da vao den 2")
    return {
        type : typereader.GET_READER_CURREN,
        readers,
    }
} 

export const AddNewCurrenRequest = (data,id_token) =>{
    return (dispatch) =>{
        return api.CallApi("readers","post",data,id_token).then(res =>{
            alert("Thêm thông tin thành công");
            dispatch(AddNewCurren(res.data))
        })
    }
}

export const AddNewCurren = (reader) =>{
    return {
        type: typereader.ADD_NEW_CURREN,
        reader,

    }
}

export const UpdateReaderCurrenRequest = (id,reader,id_token) =>{
    return (dispatch) =>{
        return api.CallApi(`readers/${id}`,'put',reader,id_token).then(res =>{
            alert("cập nhật thông tin cá nhân thành công");
            dispatch(UpdateReaderCurren(res.data))
        })
    }
}

export const UpdateReaderCurren = (reader) =>{
    return {
        type: typereader.UPDATE_READER_CURREN,
        reader,

    }
}

export const SearchRequest = (id_token,content_search) =>{
    return (dispatch) =>{
        return api.CallApi(`books?${content_search}`,'get',null,id_token).then(res =>{
            dispatch(Search(res.data))
        })
    }

}

export const Search = (books) =>{
    return {
        type: types.SEARCH,
        books,
    }
}

export const GetAllBookRequest = (id_token) =>{
    return (dispatch) =>{
        return api.CallApi('books','get',null,id_token).then(res =>{
            dispatch(GetAllBook(res.data))
        })
    }
}

export const GetAllBook = (books) =>{
    return {
        type : types.GET_ALLL_BOOK,
        books,
    }
}

export const GetAllCategoryRequest = (id_token) =>{
    return (dispatch) =>{
        return api.CallApi("catagories",'get',null,id_token).then(res =>{
            dispatch(GetAllCategory(res.data))
        })
    }

}

export const GetAllCategory = (categorys) =>{
    return {
        type : typecategory.GET_ALL_CATEGORY,
        categorys,
    }
}
