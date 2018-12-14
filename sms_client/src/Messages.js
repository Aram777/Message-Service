import React, { Component } from 'react';
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import { ProgressBar } from "react-bootstrap";
import Button from 'react-bootstrap/lib/Button';
import CustomerMsg from './CustomerMsg';

import faker from "faker";
import axios from 'axios';
import './Messages.css';
const COLUMN_WIDTH = 140;
const ProgressBarFormatter = ({ value }) => {
    return <ProgressBar now={value} label={`${value}%`} style={{ background: 'black', color: 'red' }} />;
};
const columns = [
    {
        key: "idmessages",
        name: "Message ID",
        frozen: true,
        width: 120
    },
    {
        key: "msgsubject",
        name: "Subject",
        frozen: true,
        width: 120
    },
    {
        key: "byemaildesc",
        name: "By Email",
        frozen: true,
        width: 70
    },
    {
        key: "bysmsdesc",
        name: "By Sms",
        frozen: true,
        width: 70
    },
    {
        key: "statusdesc",
        name: "Status",
        width: 100
    },
    {
        key: "Completed",
        name: "Completed",
        formatter: ProgressBarFormatter,
        width: 120
    }

];


const columnsdet = [
    {
        key: "idcustomers",
        name: "ID",
        frozen: true,
        width: 70
    },
    {
        key: "first_name",
        name: "First Name",
        frozen: true,
        width: 170
    },
    {
        key: "last_name",
        name: "Last Name",
        frozen: true,
        width: 170
    }
];
const columnsdetnew = [
    {
        key: "id",
        name: "ID",
        frozen: true,
        width: 70
    },
    {
        key: "first_name",
        name: "First Name",
        frozen: true,
        width: 170
    },
    {
        key: "last_name",
        name: "Last Name",
        frozen: true,
        width: 170
    }
];

class Messages extends Component {
    constructor() {
        super();
        this.addStatus = false;
        this.msg_id = 0;
        this.custForMsg = [];
        this.getMessages = this.getMessages.bind(this);
        this.rowselect = this.rowselect.bind(this);
        this.handleSendMsgClick=this.handleSendMsgClick.bind(this);
        //this.addMessage = this.addMessage.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.CreateGrid = this.CreateGrid.bind(this);
        this.CreateChildGrid = this.CreateChildGrid.bind(this);
        this.handleAddCustomerClick = this.handleAddCustomerClick.bind(this);
        this.showButt = this.showButt.bind(this);

        this.newCustomer = [];
        this.selectedIndexes = [];
        this.frmStatus = 0;
        this.selected_row = 0;
        this.state = {
            lstMessages: [], lstMsg: []
        };
        this.getMessages();

        this.CreateNewCustomerGrid = this.CreateNewCustomerGrid.bind(this);



    }

    handleAddCustomerClick() {
        if (this.addStatus) {
            this.myDivRight.style.visibility = "hidden";
            this.CreateChildGrid()
            this.btnAddCustomer.innerHTML = "Add Customer";
        }
        else {
            this.myDivRight.style.visibility = "visible";
            this.CreateNewCustomerGrid(1);
            this.btnAddCustomer.innerHTML = "Hide";

        }
        this.addStatus = !this.addStatus;
        //
    }
    handleSendMsgClick(){
        const Message = {
            msgsubject: this.myDivmsgsubject.value,
            message_text: this.myDivmessage_text.value,
            byemail: this.myDivbyemail.checked,
            bysms: this.myDivbysms.checked,
            createdate: new Date(),
            status: 1   
        }
       
        axios
        .put('http://localhost:3000/messages/' + this.myDividmessages.value, Message)
        .then(res => {
            this.getMessages();
        });

    }

    handleSaveClick() {
        const Message = {
            msgsubject: this.myDivmsgsubject.value,
            message_text: this.myDivmessage_text.value,
            byemail: this.myDivbyemail.checked,
            bysms: this.myDivbysms.checked,
            createdate: new Date(),
            status: 0
        }

        if (this.frmStatus == 1) {

            axios
                .post('http://localhost:3000/messages', Message)
                .then(res => {
                    this.getMessages();
                });

        }
        if (this.frmStatus == 2) {

            axios
                .put('http://localhost:3000/messages/' + this.myDividmessages.value, Message)
                .then(res => {
                    this.getMessages();
                });

        }

        this.frmStatus = 0;
        this.showButt();


    }
    showButt() {
        switch (this.frmStatus) {
            case 0:
                this.btnAdd.style.visibility = "visible";
                this.btnEdit.style.visibility = "visible";
                this.btnSave.style.visibility = "hidden";
                this.btnCancel.style.visibility = "hidden";
                this.btnAddCustomer.style.visibility = "visible";
                this.btnSendMessage.style.visibility = "visible";
                this.myDivmsgsubject.disabled = true;
                this.myDivmessage_text.disabled = true;
                this.myDivbyemail.disabled = true;
                this.myDivbysms.disabled = true;
                if (this.myDivstatus.value == 1) {
                    this.btnEdit.style.visibility = "hidden";
                    this.btnAddCustomer.style.visibility = "hidden";
                    this.btnSendMessage.style.visibility = "hidden";
                }
                this.myDivBaseGrid.disabled = false;
                break;
            case 1:
                this.myDivBaseGrid.disabled = true;
                this.btnAdd.style.visibility = "hidden";
                this.btnEdit.style.visibility = "hidden";
                this.btnSave.style.visibility = "visible";
                this.btnCancel.style.visibility = "visible";

                this.myDividmessages.value = 0;
                this.myDivmsgsubject.value = '';

                this.myDivmessage_text.value = '';


                this.myDivbyemail.checked = '';
                this.myDivbysms.checked = '';



                this.myDivmsgsubject.disabled = false;
                this.myDivmessage_text.disabled = false;
                this.myDivbyemail.disabled = false;
                this.myDivbysms.disabled = false;


                break;
            case 2:
                this.myDivBaseGrid.disabled = true;
                this.btnAdd.style.visibility = "hidden";
                this.btnEdit.style.visibility = "hidden";
                this.btnSave.style.visibility = "visible";
                this.btnCancel.style.visibility = "visible";
                this.myDivmsgsubject.disabled = false;

                this.myDivmessage_text.disabled = false;

                this.myDivbyemail.disabled = false;
                this.myDivbysms.disabled = false;
                break;
            default:
                break;
        }


    }
    handleAddClick() {

        this.frmStatus = 1;
        this.showButt();
    }
    handleEditClick() {

        this.frmStatus = 2;
        this.showButt();
    }
    handleCancelClick() {
        this.frmStatus = 0;
        this.showButt();
        this.rowselect(this.selected_row);

    }
    handleClick() {
        for (let index = 0; index < 100; index++) {
            this.addMessage();

        }


    }

    getMessages() {
        axios.get(`http://localhost:3000/messages`).then(res => {
            const _lstMessages = res.data;
            this.setState({ lstMessages: _lstMessages });
            this.rowselect(0);
        });

        this.CreateGrid();

    }
    rowselect(iRowIdx) {
        if (iRowIdx == -99) {

        } else {

            if (this.state.lstMessages.length > 0) {
                this.selected_row = iRowIdx;
                let cust = this.state.lstMessages[iRowIdx];
                this.msg_id = cust["idmessages"];
                this.myDividmessages.value = cust["idmessages"];
                this.myDivmsgsubject.value = cust["msgsubject"];
                this.myDivmessage_text.value = cust["message_text"];
                this.myDivbyemail.checked = cust["byemail"];
                this.myDivbysms.checked = cust["bysms"];
                this.myDivstatus.value = cust["status"];
                this.showButt();
                this.myMsgUserTitle.value = 'Resulat for ' + cust["msgsubject"];


                let url = 'http://localhost:3000/messages/newmsgs/' + cust["idmessages"];
                axios.get(url).then(res => {
                     this.custForMsg = res.data;


                });
                 url = 'http://localhost:3000/messages/msgs/' + cust["idmessages"];
                axios.get(url).then(res => {
                    const _lstMsg = res.data;
                    this.setState({ lstMsg: _lstMsg });

                });
            }
        }

    }

    CreateNewCustomerGrid(idChk) {


        if (this.msg_id > 0) {



            return (<CustomerMsg Msg_id={this.custForMsg} />);
        }
        else
            return (<p></p>);
    }

    CreateGrid() {
        return (
            <div>

                <ReactDataGrid ref={c => this.myDivGrid = c}
                    columns={columns}
                    rowGetter={i => this.state.lstMessages[i]}
                    rowsCount={this.state.lstMessages.length}
                    onRowClick={this.rowselect}


                />


            </div>
        );
    }
    CreateChildGrid() {

        return (
            <div ref={c => this.myDivBaseGrid = c}>
                <ReactDataGrid
                    columns={columnsdet}
                    rowGetter={i => this.state.lstMsg[i]}
                    rowsCount={this.state.lstMsg.length}



                />
            </div>
        );
    }

    render() {

        return (
            <div>
                <div className="Top_">
                    <table >
                        <col width="100" />
                        <col width="280" />
                        <col width="100" />
                        <col width="130" />
                        <col width="250" />
                        <col width="150" />
                        <col width="150" />
                        <thead></thead>
                        <tbody>
                            <tr>
                                <td className="td_">Message Id</td>
                                <td>
                                    <input type="number" name="idmessages" ref={c => this.myDividmessages = c} style={{ width: 100, borderColor: 'gray', borderWidth: 1 }} disabled />
                                </td>
                                <td className="td_">By Email</td>
                                <td>
                                    <input type="checkbox" className="Chk_" name="byemail" ref={c => this.myDivbyemail = c} style={{ borderColor: 'gray', borderWidth: 1 }} disabled />
                                </td>
                                <td></td>
                                <td><button className="Mybutton Mybutton2" onClick={this.handleAddClick} ref={c => this.btnAdd = c}>Add </button></td>
                                <td><button className="Mybutton Mybutton2" onClick={this.handleEditClick} ref={c => this.btnEdit = c}>Edit</button></td>
                            </tr>
                            <tr>
                                <td className="td_">Subject</td>
                                <td>
                                    <input type="Text" name="msgsubject" ref={c => this.myDivmsgsubject = c} style={{ width: 100, borderColor: 'gray', borderWidth: 1 }} disabled />
                                </td>
                                <td className="td_">By SMS</td>
                                <td>
                                    <input type="checkbox" className="Chk_" name="bysms" ref={c => this.myDivbysms = c} style={{ borderColor: 'gray', borderWidth: 1 }} disabled />
                                </td>
                                <td></td>
                                <td ><button className="Mybutton Mybutton2" onClick={this.handleSaveClick} ref={c => this.btnSave = c} style={{ visibility: 'hidden' }}>Save </button></td>
                                <td ><button className="Mybutton Mybutton3" onClick={this.handleCancelClick} ref={c => this.btnCancel = c} style={{ visibility: 'hidden' }}>Cancel</button></td>
                            </tr>
                            <tr>
                                <td className="td_" height="100">Message</td>
                                <td height="100">
                                    <textarea name="message_text" ref={c => this.myDivmessage_text = c} style={{ height: 100, width: 250, borderColor: 'gray', borderWidth: 1 }} disabled />
                                </td>
                                <td></td>
                                <td>
                                    <button className="Mybutton Mybutton4" onClick={this.handleAddCustomerClick} ref={c => this.btnAddCustomer = c} style={{ visibility: 'visible' }}>Add Customer</button><br />
                                    <button className="Mybutton Mybutton4" onClick={this.handleSendMsgClick} ref={c => this.btnSendMessage = c} style={{ visibility: 'visible' }}>Send Message</button>
                                    <input type="number" name="status" ref={c => this.myDivstatus = c} style={{ width: 100, borderColor: 'gray', borderWidth: 1, visibility: 'hidden' }} disabled />

                                </td>
                            </tr>


                        </tbody>
                    </table>
                </div>
                <div className="Left_">
                    <div className="Mid_" ref={c => this.myDivMid = c}>

                        <this.CreateGrid />

                    </div>

                    <div className="Bot_">
                        <h3 >
                            <input type="Text" ref={c => this.myMsgUserTitle = c} style={{ width: 600, borderColor: 'gray', borderWidth: 1 }} disabled />

                        </h3>

                        <this.CreateChildGrid />

                    </div>
                </div>

                <div className="right_" ref={c => this.myDivRight = c} style={{ visibility: "hidden" }} >
                    <this.CreateNewCustomerGrid />
                </div>

            </div>
        );
    }
}

export default Messages;
