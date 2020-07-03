import axios from "axios";
import apiconstant from "../apiConstants/apiconstant";
const access_token = localStorage.getItem("id");
//get user notes
export function getNotes() {
  try {
    const response = axios.get(
      process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_GETNOTESLIST,
      { headers: { Authorization: localStorage.getItem("id") } }
    );
    return response;
  } catch (error) {
    return error;
  }
}
//set user notes
export function setNotes(data) {
  try {
    const response = axios.post(
      process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_ADDNOTES,
      data,
      { headers: { Authorization: localStorage.getItem("id") } }
    );
    return response;
  } catch (error) {
    return error;
  }
}

export function searchUserList(data) {
  try {
    const response = axios.post(
      process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_SEARCHUSERLIST,
      data,
      { headers: { Authorization: localStorage.getItem("id") } }
    );
    return response;
  } catch (error) {
    return error;
  }
}

export function archiveNoteList() {
  try {
    const response = axios.get(
      process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_ARCHIVENOTELIST,
      { headers: { Authorization: localStorage.getItem("id") } }
    );
    return response;
  } catch (error) {
    return error;
  }
}

export function archiveNote(data) {
  try {
    const response = axios.post(
      process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_ARCHIVENOTES,
      data,
      { headers: { Authorization: localStorage.getItem("id") } }
    );
    return response;
  } catch (error) {
    return error;
  }
}

export function updateNotes(data) {
  try {
    const response = axios.post(
      process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_UPDATESNOTES,
      data,
      { headers: { Authorization: localStorage.getItem("id") } }
    );
    return response;
  } catch (error) {
    return error;
  }
}

export function deleteNotes(data) {
  try {
    const response = axios.post(
      process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_DELETENOTES,
      data,
      { headers: { Authorization: localStorage.getItem("id") } }
    );
    return response;
  } catch (error) {
    return error;
  }
}

export function removeRemainderNotes(data) {
  try {
    const response = axios.post(
      process.env.REACT_APP_BASEURL +
        apiconstant.REACT_APP_REMOVEREMAINDERNOTES,
      data,
      { headers: { Authorization: localStorage.getItem("id") } }
    );
    return response;
  } catch (error) {
    return error;
  }
}

export function updateReminderNotes(data) {
  try {
    const response = axios.post(
      process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_UPDATEREMINDER,
      data,
      { headers: { Authorization: localStorage.getItem("id") } }
    );
    return response;
  } catch (error) {
    return error;
  }
}

export function changeColor(data) {
  try {
    const response = axios.post(
      process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_CHANGECOLOR,
      data,
      { headers: { Authorization: localStorage.getItem("id") } }
    );
    return response;
  } catch (error) {
    return error;
  }
}

export function getReminderNoteList() {
  try {
    const response = axios.get(
      process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_GETREMINDERNOTELIST,
      { headers: { Authorization: localStorage.getItem("id") } }
    );
    return response;
  } catch (error) {
    return error;
  }
}
export function getNoteLabelList() {
  try {
    const response = axios.get(
      process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_GETNOTELABELLIST,
      { headers: { Authorization: localStorage.getItem("id") } }
    );
    return response;
  } catch (error) {
    return error;
  }
}
export function addLabels(data) {
  try {
    const response = axios.post(
      process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_NOTELABELS,
      data,
      { headers: { Authorization: localStorage.getItem("id") } }
    );
    return response;
  } catch (error) {
    return error;
  }
}
export function deleteNoteLabel(id) {
  try {
    const response = axios.delete(
      process.env.REACT_APP_BASEURL +
        apiconstant.REACT_APP_NOTELABELS +
        "/" +
        id +
        apiconstant.REACT_APP_DELETENOTELABEL
    );
    return response;
  } catch (error) {
    return error;
  }
}
export function addlabelNotes(id, labelID) {
  try {
    const response = axios.post(
      process.env.REACT_APP_BASEURL +
        "/notes/" +
        id +
        apiconstant.REACT_APP_ADDLABELNOTES +
        "/" +
        labelID +
        "/add?access_token=" +
        localStorage.getItem("id")
    );
    return response;
  } catch (error) {
    return error;
  }
}
export function deletelabelNotes(id, labelID) {
  try {
    const response = axios.post(
      process.env.REACT_APP_BASEURL +
        "/notes/" +
        id +
        apiconstant.REACT_APP_ADDLABELNOTES +
        "/" +
        labelID +
        "/remove?access_token=" +
        localStorage.getItem("id")
    );
    return response;
  } catch (error) {
    return error;
  }
}
export function service() {
  try {
    const response = axios.get(
      process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_SERVICE,
      { headers: { Authorization: localStorage.getItem("id") } }
    );
    return response;
  } catch (error) {
    return error;
  }
}
export function logout(data) {
  try {
    const response = axios.post(
      process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_LOGOUT,
      data,
      { headers: { Authorization: localStorage.getItem("id") } }
    );
    return response;
  } catch (error) {
    return error;
  }
}
export function fileUpload(data) {
  try {
    const response = axios.post(
      process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_UPLOADPROFILEIMAGE,
      data,
      { headers: { Authorization: localStorage.getItem("id") } }
    );
    return response;
  } catch (error) {
    return error;
  }
}

export function AddcollaboratorsNotes(data, id) {
  try {
    const response = axios.post(
      process.env.REACT_APP_BASEURL +
        "/notes/" +
        id +
        "/" +
        apiconstant.REACT_APP_AddcollaboratorsNotes,
      data,
      { headers: { Authorization: localStorage.getItem("id") } }
    );
    return response;
  } catch (error) {
    return error;
  }
}

export function removeCollaboratorsNotes(noteId, mailId) {
  try {
    const response = axios.delete(
      process.env.REACT_APP_BASEURL +
        "/notes/" +
        noteId +
        "/" +
        apiconstant.REACT_APP_removeCollaboratorsNotes +
        "/" +
        mailId,
      { headers: { Authorization: localStorage.getItem("id") } }
    );
    return response;
  } catch (error) {
    return error;
  }
}

export function questionAndAnswerNotes(data) {
  try {
    const response = axios.post(
      process.env.REACT_APP_BASEURL +
        apiconstant.REACT_APP_questionAndAnswerNotes +
        apiconstant.REACT_APP_addQuestionAndAnswer,
      data,
      { headers: { Authorization: localStorage.getItem("id") } }
    );
    return response;
  } catch (error) {
    return error;
  }
}

export function getNotesDetail(id) {
  try {
    const response = axios.get(
      process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_getNotesDetail + id,
      { headers: { Authorization: localStorage.getItem("id") } }
    );
    return response;
  } catch (error) {
    return error;
  }
}

export function like(data, id) {
  try {
    const response = axios.post(
      process.env.REACT_APP_BASEURL +
        apiconstant.REACT_APP_questionAndAnswerNotes +
        "like/" +
        id,
      data,
      { headers: { Authorization: localStorage.getItem("id") } }
    );
    return response;
  } catch (error) {
    return error;
  }
}

export function reply(data, id) {
  try {
    const response = axios.post(
      process.env.REACT_APP_BASEURL +
        apiconstant.REACT_APP_questionAndAnswerNotes +
        "reply/" +
        id,
      data,
      { headers: { Authorization: localStorage.getItem("id") } }
    );
    return response;
  } catch (error) {
    return error;
  }
}
export function rate(data, id) {
  try {
    const response = axios.post(
      process.env.REACT_APP_BASEURL +
        apiconstant.REACT_APP_questionAndAnswerNotes +
        "rate/" +
        id,
      data,
      { headers: { Authorization: localStorage.getItem("id") } }
    );
    return response;
  } catch (error) {
    return error;
  }
}
export function getNotesListByLabel(label) {
  try {
    const response = axios.post(
      process.env.REACT_APP_BASEURL +
        apiconstant.REACT_APP_getNotesListByLabel +
        label,
      {},
      { headers: { Authorization: localStorage.getItem("id") } }
    );
    return response;
  } catch (error) {
    return error;
  }
}
export function placeOrder(data) {
  try {
    const response = axios.post(
      process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_placeOrder,
      data,
      { headers: { Authorization: localStorage.getItem("id") } }
    );
    return response;
  } catch (error) {
    return error;
  }
}
export function myCart() {
  try {
    const response = axios.get(
      process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_myCart,
      { headers: { Authorization: localStorage.getItem("id") } }
    );
    return response;
  } catch (error) {
    return error;
  }
}
export function deleteForeverNotes(data) {
  try {
    const response = axios.post(
      process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_deleteForeverNotes,
      data,
      { headers: { Authorization: localStorage.getItem("id") } }
    );
    return response;
  } catch (error) {
    return error;
  }
}
export function trashNotes(data) {
  try {
    const response = axios.post(
      process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_trashNotes,
      data,
      { headers: { Authorization: localStorage.getItem("id") } }
    );
    return response;
  } catch (error) {
    return error;
  }
}
export function updateChecklist(data, id, checklistId) {
  try {
    const response = axios.post(
      process.env.REACT_APP_BASEURL +
        "/notes/" +
        id +
        "/checklist/" +
        checklistId +
        "/update",
      data,
      { headers: { Authorization: localStorage.getItem("id") } }
    );
    return response;
  } catch (error) {
    return error;
  }
}
