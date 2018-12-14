import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import axios from 'axios';

class CustomerMsg extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.createGrid = this.createGrid.bind(this);
        this._columns = [
            {
                key: "id",
                name: "ID"
            },
            {
                key: "first_name",
                name: "First Name"
            },
            {
                key: "last_name",
                name: "Last Name"
            }
        ];
        this.state = {
            rows: this.props.Msg_id, selectedIndexes: []
        };

        //this.setState({ rows: this.props.Msg_id });
        






    }

    handleAddClick() {
        for (let index = 0; index < this.state.selectedIndexes.length; index++) {

            let cust = this.state.rows[this.state.selectedIndexes[index]];
            let url = 'http://localhost:3000/messages/msg/' + this.props.Msg_id + '/cus/' + cust["id"];
            const Message = [];
            axios
                .post(url, Message)
                .then(res => {

                });
        }
        this.state.selectedIndexes = [];
        this.createGrid();

    }

    rowGetter = i => {
        return this.state.rows[i];
    };

    onRowsSelected = rows => {
        this.setState({
            selectedIndexes: this.state.selectedIndexes.concat(
                rows.map(r => r.rowIdx)
            )
        });
    };

    onRowsDeselected = rows => {
        let rowIndexes = rows.map(r => r.rowIdx);
        this.setState({
            selectedIndexes: this.state.selectedIndexes.filter(
                i => rowIndexes.indexOf(i) === -1
            )
        });
    };
    createGrid() {

        return (
            <ReactDataGrid
                rowKey="id"
                columns={this._columns}
                rowGetter={this.rowGetter}
                rowsCount={this.state.rows.length}
                minHeight={500}
                rowSelection={{
                    showCheckbox: true,
                    enableShiftSelect: true,
                    onRowsSelected: this.onRowsSelected,
                    onRowsDeselected: this.onRowsDeselected,
                    selectBy: {
                        indexes: this.state.selectedIndexes
                    }
                }}
            />)
    }


    render() {
        const rowText = this.state.selectedIndexes.length === 1 ? "row" : "rows";
        return (
            <div>
                <div>
                    <span>
                        {this.state.selectedIndexes.length} {rowText} selected
        </span>
                    <this.createGrid />
                </div>
                <div>
                    <button className="Mybutton Mybutton2" onClick={this.handleAddClick} ref={c => this.btnAdd = c}>Add </button>
                </div>
            </div>
        );
    }
}

export default CustomerMsg;
