import React, { Component } from 'react';
import axios from 'axios';
import ReactDataGrid from "react-data-grid";
import './Customers.css';
import faker from "faker";
import Button from 'react-bootstrap/lib/Button';
const COLUMN_WIDTH = 140;
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
        width: 120
    },
    {
        key: "smsdesc",
        name: "Send SMS",
        width: 120
    },
    {
        key: "cntallmsg",
        name: "All Messages",
        width: 120
    },
    {
        key: "cntansmsg",
        name: "Answered",
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
        this.handleSaveClick = this.handleSaveClick.bind(this);
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

        }
        this.state = {
            lstCustomers: [], lstMsg: []
        };
        this.getCustomers();

    }
    handleAddClick() {
        this.myDividcustomers.value = 0;
        this.myDivfirst_name.value = '';
        this.myDivlast_name.value = '';
        this.myDivemail.value = '';
        this.myDivname_prefix.value = '';
        this.myDivphone_default.value = ''
        this.myDivemailallowed.checked = '';
        this.myDivsmsallowed.checked = '';
        this.myDivcreatedate.innerText = new Date();
        this.btnAdd.style.visibility = "hidden";
        this.btnEdit.style.visibility = "hidden";
        this.btnSave.style.visibility = "visible";
        this.btnCancel.style.visibility = "visible";
        this.frmStatus = 1;
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
                this.myDivcreatedate.innerText = cust["createdate"];
                // let url = 'http://localhost:3000/customersmsgs/' + cust["idcustomers"];

                // axios.get(url).then(res => {
                //     const _lstMsg = res.data;
                //     this.setState({ lstMsg: _lstMsg });

                // });

            }
        }

    }
    render() {
        //this.rowselect(0);
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
                                    <input type="phone" name="phone_default" ref={c => this.myDivphone_default = c} style={{ width: 200, borderColor: 'gray', borderWidth: 1 }} />
                                </td>
                                <td></td>
                                <td><button onClick={this.handleAddClick} ref={c => this.btnAdd = c}>Add </button></td>
                                <td><button onClick={this.handleEditClick} ref={c => this.btnEdit = c}>Edit</button></td>
                            </tr>
                            <tr>
                                <td className="td_">Title</td>
                                <td>
                                    <input type="Text" name="name_prefix" ref={c => this.myDivname_prefix = c} style={{ width: 100, borderColor: 'gray', borderWidth: 1 }} />
                                </td>
                                <td className="td_">Send Email</td>
                                <td>
                                    <input type="checkbox" className="Chk_" name="emailallowed" ref={c => this.myDivemailallowed = c} style={{ borderColor: 'gray', borderWidth: 1 }} />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className="td_">First Name</td>
                                <td>
                                    <input type="Text" name="first_name" ref={c => this.myDivfirst_name = c} size="150" style={{ width: 170, borderColor: 'gray', borderWidth: 1 }} />
                                </td>
                                <td className="td_">Send SMS</td>
                                <td>
                                    <input type="checkbox" className="Chk_" name="smsallowed" ref={c => this.myDivsmsallowed = c} style={{ borderColor: 'gray', borderWidth: 1 }} />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className="td_">Last Name</td>
                                <td>
                                    <input type="Text" name="last_name" ref={c => this.myDivlast_name = c} style={{ width: 170, borderColor: 'gray', borderWidth: 1 }} />
                                </td>
                                <td className="td_">Create Date</td>
                                <td>
                                    <input type="date" name="createdate" ref={c => this.myDivcreatedate = c} style={{ width: 170, borderColor: 'gray', borderWidth: 1 }} disabled />
                                </td>
                                {/* <td><button onClick={this.handleClick}>create</button></td> */}
                                <td></td>
                            </tr>
                            <tr>
                                <td className="td_">Email</td>
                                <td>
                                    <input type="email" name="email" ref={c => this.myDivemail = c} s style={{ width: 250, borderColor: 'gray', borderWidth: 1 }} />
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><button onClick={this.handleSaveClick} ref={c => this.btnSave = c} style={{ visibility: 'hidden' }}>Save </button></td>
                                <td><button onClick={this.handleCancelClick} ref={c => this.btnCancel = c} style={{ visibility: 'hidden' }}>Cancel</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="Mid_" ref={c => this.myDivMid = c}>
                    <ReactDataGrid ref={c => this.myDivGrid = c}
                        columns={columns}
                        rowGetter={i => this.state.lstCustomers[i]}
                        rowsCount={this.state.lstCustomers.length}
                        onRowClick={this.rowselect}

                    />
                </div>
                <div className="Bot_">
                    <tabe>

                        <td>sdfsdfg</td>
                    </tabe>

                </div>
            </div>
        );
    }
}

export default Customers;
