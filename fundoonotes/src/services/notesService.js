import axios from "axios";
import apiconstant from "../apiConstants/apiconstant";
const access_token = localStorage.getItem("id");
//get user notes
export async function getNotes() {
    try {
      const response = await axios.get(process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_GETNOTES , 
        {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
//set user notes
export async function setNotes(data) {
    try {
      const response = await axios.post(process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_SETNOTES,data, {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  export async function searchUserList(data) {
    try {
      const response = await axios.post(process.env.REACT_APP_BASEURL+ apiconstant.REACT_APP_SEARCHURLLIST,data , {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  export async function archiveNoteList() {
    try {
      const response = await axios.get(process.env.REACT_APP_BASEURL+ apiconstant.REACT_APP_ARCHIVENOTELIST, {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  export async function archiveNote(data) {
    try {
      const response = await axios.post(process.env.REACT_APP_BASEURL+ apiconstant.REACT_APP_ARCHIVENOTES,data , {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  
  export async function updateNotes(data) {
    try {
      const response = await axios.post(process.env.REACT_APP_BASEURL+ apiconstant.REACT_APP_UPDATESNOTES,data , {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  
  export async function deleteNotes(data) {
    try {
      const response = await axios.post(process.env.REACT_APP_BASEURL+ apiconstant.REACT_APP_DELETENOTES,data , {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  export async function removeRemainderNotes(data) {
    try {
      const response = await axios.post(process.env.REACT_APP_BASEURL+ apiconstant.REACT_APP_REMOVEREMAINDERNOTES,data , {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  export async function updateReminderNotes(data) {
    try {
      const response = await axios.post(process.env.REACT_APP_BASEURL+ apiconstant.REACT_APP_UPDATEREMINDER,data , {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  export async function changeColor(data) {
    try {
      const response = await axios.post(process.env.REACT_APP_BASEURL+ apiconstant.REACT_APP_CHANGECOLOR,data , {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  

  export async function getReminderNoteList() {
    try {
      const response = await axios.get(process.env.REACT_APP_BASEURL+ apiconstant.REACT_APP_GETREMINDERNOTELIST, {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  export async function getNoteLabelList() {
    try {
      const response = await axios.get(process.env.REACT_APP_BASEURL+ apiconstant.REACT_APP_GETNOTELABELLIST, {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  export async function addLabels(data) {
    try {
      const response = await axios.post(process.env.REACT_APP_BASEURL+ apiconstant.REACT_APP_NOTELABELS,data , {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  export async function deleteNoteLabel(id) {
    try {
      const response = await axios.delete(process.env.REACT_APP_BASEURL+ apiconstant.REACT_APP_NOTELABELS +"/"+
        id+apiconstant.REACT_APP_DELETENOTELABEL,
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  export async function addlabelNotes(id,labelID) {
    try {
      const response = await axios.post(process.env.REACT_APP_BASEURL+"/notes/"+
        id+apiconstant.REACT_APP_ADDLABELNOTES + "/" + labelID +"/add?access_token="+ access_token ,
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  export async function deletelabelNotes(id,labelID) {
    try {
      const response = await axios.post(process.env.REACT_APP_BASEURL+"/notes/"+
        id+apiconstant.REACT_APP_ADDLABELNOTES + "/" + labelID +"/remove?access_token="+ access_token ,
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  export async function service() {
    try {
      const response = await axios.get(process.env.REACT_APP_BASEURL+ apiconstant.REACT_APP_SERVICE, {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  export async function logout(data) {
    try {
      const response = await axios.post(process.env.REACT_APP_BASEURL+ apiconstant.REACT_APP_LOGOUT,data , {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
   export async function fileUpload(data) {
    try {
      const response = await axios.post(process.env.REACT_APP_BASEURL+ apiconstant.REACT_APP_UPLOADPROFILEIMAGE,data , {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  export async function AddcollaboratorsNotes(data,id) {
    try {
      const response = await axios.post(process.env.REACT_APP_BASEURL +"/notes/"+ id +"/"+ apiconstant.REACT_APP_AddcollaboratorsNotes,data , {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  
  export async function removeCollaboratorsNotes(noteId,mailId) {
    try {
      const response = await axios.delete(process.env.REACT_APP_BASEURL +"/notes/"+ noteId +"/"+ apiconstant.REACT_APP_removeCollaboratorsNotes +"/"+mailId, {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  export async function questionAndAnswerNotes(data) {
    try {
      const response = await axios.post(process.env.REACT_APP_BASEURL+ apiconstant.REACT_APP_questionAndAnswerNotes + 
        apiconstant.REACT_APP_addQuestionAndAnswer ,data , {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  export async function getNotesDetail(id) {
    try {
      const response = await axios.get(process.env.REACT_APP_BASEURL+ apiconstant.REACT_APP_getNotesDetail + id , {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  export async function like(data,id) {
    console.log(id)
    try {
      const response = await axios.post(process.env.REACT_APP_BASEURL+ apiconstant.REACT_APP_questionAndAnswerNotes+"like/"+id ,data, {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  export async function reply(data,id) {
    try {
      const response = await axios.post(process.env.REACT_APP_BASEURL+ apiconstant.REACT_APP_questionAndAnswerNotes+"reply/"+id ,data, {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  export async function rate(data,id) {
    try {
      const response = await axios.post(process.env.REACT_APP_BASEURL+ apiconstant.REACT_APP_questionAndAnswerNotes+"rate/"+id ,data, {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  export async function getNotesListByLabel(label) {
    try {
      const response = await axios.post(process.env.REACT_APP_BASEURL+ apiconstant.REACT_APP_getNotesListByLabel+label,{},
         {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  export async function placeOrder(data) {
    try {
      const response = await axios.post(process.env.REACT_APP_BASEURL+ apiconstant.REACT_APP_placeOrder,data,
         {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  export async function myCart() {
    try {
      const response = await axios.get(process.env.REACT_APP_BASEURL+ apiconstant.REACT_APP_myCart,
         {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }


  // http://fundoonotes.incubation.bridgelabz.com/api/productcarts/myCart
