import React, { Component } from 'react';
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import { ProgressBar } from "react-bootstrap";
import Button from 'react-bootstrap/lib/Button';


import faker from "faker";
import axios from 'axios';
import './Customers.css';
const COLUMN_WIDTH = 140;
const ProgressBarFormatter = ({ value }) => {
    return <ProgressBar now={value} label={`${value}%`} style={{ background: 'black', color: 'red' }} />;
};
const columns = [
    {
        key: "idcustomers",
        name: "Customer ID",
        frozen: true,
        width: 120
    },
    {
        key: "name_prefix",
        name: "Title",
        frozen: true,
        width: 60
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
    },
    {
        key: "email",
        name: "Email",
        width: 250
    },
    {
        key: "phone_default",
        name: "Phone",
        width: 120
    },
    {
        key: "emaildesc",
        name: "Send Email",
        width: 100
    },
    {
        key: "smsdesc",
        name: "Send SMS",
        width: 100
    },
    {
        key: "cntallmsg",
        name: "All",
        width: 70
    },
    {
        key: "cntansmsg",
        name: "Answered",
        width: 120
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
        key: "msgsubject",
        name: "Subject",
        frozen: true,
        width: 250
    },
    {
        key: "statusdesc",
        name: "Status",
        frozen: true,
        width: 150
    }
];


class Customers extends Component {
    constructor() {
        super();

        this.getCustomers = this.getCustomers.bind(this);
        this.rowselect = this.rowselect.bind(this);
        this.addCustomer = this.addCustomer.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.CreateGrid = this.CreateGrid.bind(this);
        this.CreateChildGrid = this.CreateChildGrid.bind(this);

        this.showButt = this.showButt.bind(this);

        this.frmStatus = 0;
        this.selected_row = 0;
        this.state = {
            lstCustomers: [], lstMsg: []
        };
        this.getCustomers();




    }
    handleSaveClick() {
        const User = {
            first_name: this.myDivfirst_name.value,
            last_name: this.myDivlast_name.value,
            name_prefix: this.myDivname_prefix.value,
            email: this.myDivemail.value,
            phone_default: this.myDivphone_default.value,
            emailallowed: this.myDivemailallowed.checked,
            smsallowed: this.myDivsmsallowed.checked,
            createdate: new Date()
        }

        if (this.frmStatus == 1) {

            axios
                .post('http://localhost:3000/customers', User)
                .then(res => {
                });

            this.getCustomers();
        }
        if (this.frmStatus == 2) {

            axios
                .put('http://localhost:3000/customers/' + this.myDividcustomers.value, User)
                .then(res => {
                });
                this.getCustomers();

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
                this.myDivfirst_name.disabled = true;
                this.myDivlast_name.disabled = true;
                this.myDivemail.disabled = true;
                this.myDivname_prefix.disabled = true;
                this.myDivphone_default.disabled = true;
                this.myDivemailallowed.disabled = true;
                this.myDivsmsallowed.disabled = true;
                break;
            case 1:
                this.btnAdd.style.visibility = "hidden";
                this.btnEdit.style.visibility = "hidden";
                this.btnSave.style.visibility = "visible";
                this.btnCancel.style.visibility = "visible";

                this.myDividcustomers.value = 0;
                this.myDivfirst_name.value = '';
                this.myDivlast_name.value = '';
                this.myDivemail.value = '';
                this.myDivname_prefix.value = '';
                this.myDivphone_default.value = ''
                this.myDivemailallowed.checked = '';
                this.myDivsmsallowed.checked = '';
                this.myDivcreatedate.value = new Date();

                this.myDividcustomers.value = 0;
                this.myDivfirst_name.disabled = false;
                this.myDivlast_name.disabled = false;
                this.myDivemail.disabled = false;
                this.myDivname_prefix.disabled = false;
                this.myDivphone_default.disabled = false;
                this.myDivemailallowed.disabled = false;
                this.myDivsmsallowed.disabled = false;
                this.myDivcreatedate.value = new Date();

                break;
            case 2:
                this.btnAdd.style.visibility = "hidden";
                this.btnEdit.style.visibility = "hidden";
                this.btnSave.style.visibility = "visible";
                this.btnCancel.style.visibility = "visible";
                this.myDivfirst_name.disabled = false;
                this.myDivlast_name.disabled = false;
                this.myDivemail.disabled = false;
                this.myDivname_prefix.disabled = false;
                this.myDivphone_default.disabled = false;
                this.myDivemailallowed.disabled = false;
                this.myDivsmsallowed.disabled = false;
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
            this.addCustomer();

        }


    }
    addCustomer() {

        const User = {
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            name_prefix: faker.name.prefix(),
            email: faker.internet.email(),
            phone_default: "0401234567",
            emailallowed: 0,
            smsallowed: 0,
            createdate: new Date()
        }


        axios
            .post('http://localhost:3000/customers', User)
            .then(res => {
                // console.log(res);
                // console.log(res.data);
                // 

            });
    }
    getCustomers() {
        axios.get(`http://localhost:3000/customers`).then(res => {
            const lstCustomers = res.data;
            this.setState({ lstCustomers });
            this.rowselect(0);
        });

        this.CreateGrid();

    }
    rowselect(iRowIdx) {
        if (iRowIdx == -99) {

        } else {

            if (this.state.lstCustomers.length > 0) {
                this.selected_row = iRowIdx;
                let cust = this.state.lstCustomers[iRowIdx];
                this.myDividcustomers.value = cust["idcustomers"];
                this.myDivfirst_name.value = cust["first_name"];
                this.myDivlast_name.value = cust["last_name"];
                this.myDivemail.value = cust["email"];
                this.myDivname_prefix.value = cust["name_prefix"];
                this.myDivphone_default.value = cust["phone_default"];
                this.myDivemailallowed.checked = cust["emailallowed"];
                this.myDivsmsallowed.checked = cust["smsallowed"];
                this.myDivcreatedate.value = cust["createdate"];
                this.myMsgUserTitle.value = 'Registered message for '+cust["first_name"]+'  '+cust["last_name"];
                
                let url = 'http://localhost:3000/customers/msgs/' + cust["idcustomers"];

                axios.get(url).then(res => {
                    const _lstMsg = res.data;
                    this.setState({ lstMsg: _lstMsg });

                });

            }
        }

    }
    CreateGrid() {
        return (
            <div>
                <ReactDataGrid ref={c => this.myDivGrid = c}
                    columns={columns}
                    rowGetter={i => this.state.lstCustomers[i]}
                    rowsCount={this.state.lstCustomers.length}
                    onRowClick={this.rowselect}


                />
            </div>
        );
    }
    CreateChildGrid() {
        return (
            <div>
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
                                <td className="td_">Customer Id</td>
                                <td>
                                    <input type="number" name="idcustomers" ref={c => this.myDividcustomers = c} style={{ width: 100, borderColor: 'gray', borderWidth: 1 }} disabled />
                                </td>
                                <td className="td_">Phone</td>
                                <td>
                                    <input type="phone" name="phone_default" ref={c => this.myDivphone_default = c} style={{ width: 200, borderColor: 'gray', borderWidth: 1 }} disabled />
                                </td>
                                <td></td>
                                <td><button className="Mybutton Mybutton2" onClick={this.handleAddClick} ref={c => this.btnAdd = c}>Add </button></td>
                                <td><button  className="Mybutton Mybutton2" onClick={this.handleEditClick} ref={c => this.btnEdit = c}>Edit</button></td>
                            </tr>
                            <tr>
                                <td className="td_">Title</td>
                                <td>
                                    <input type="Text" name="name_prefix" ref={c => this.myDivname_prefix = c} style={{ width: 100, borderColor: 'gray', borderWidth: 1 }} disabled />
                                </td>
                                <td className="td_">Send Email</td>
                                <td>
                                    <input type="checkbox" className="Chk_" name="emailallowed" ref={c => this.myDivemailallowed = c} style={{ borderColor: 'gray', borderWidth: 1 }} disabled />
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className="td_">First Name</td>
                                <td>
                                    <input type="Text" name="first_name" ref={c => this.myDivfirst_name = c} size="150" style={{ width: 170, borderColor: 'gray', borderWidth: 1 }} disabled />
                                </td>
                                <td className="td_">Send SMS</td>
                                <td>
                                    <input type="checkbox" className="Chk_" name="smsallowed" ref={c => this.myDivsmsallowed = c} style={{ borderColor: 'gray', borderWidth: 1 }} disabled />
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>


                            </tr>
                            <tr>
                                <td className="td_">Last Name</td>
                                <td>
                                    <input type="Text" name="last_name" ref={c => this.myDivlast_name = c} style={{ width: 170, borderColor: 'gray', borderWidth: 1 }} disabled />
                                </td>
                                <td className="td_">Create Date</td>
                                <td>
                                    <input type="text" name="createdate" ref={c => this.myDivcreatedate = c} style={{ width: 200, borderColor: 'gray', borderWidth: 1 }} disabled />
                                </td>
                                <td></td>
                                <td ><button className="Mybutton Mybutton2" onClick={this.handleSaveClick} ref={c => this.btnSave = c} style={{ visibility: 'hidden' }}>Save </button></td>
                                <td ><button className="Mybutton Mybutton3" onClick={this.handleCancelClick} ref={c => this.btnCancel = c} style={{ visibility: 'hidden' }}>Cancel</button></td>
                            </tr>
                            <tr>
                                <td className="td_">Email</td>
                                <td>
                                    <input type="email" name="email" ref={c => this.myDivemail = c} s style={{ width: 250, borderColor: 'gray', borderWidth: 1 }} disabled />
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
        );
    }
}

export default Customers;
