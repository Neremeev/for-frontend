import React from "react";
import moment from "moment";

import {
    SelectionListWrapper,
    SelectionListLabel,
    SelectionList
} from "./selection-list-styled";
import {SelectionListItem} from "../../components/selection-list-item";
import {TIME_FORMAT} from "../../constants";

export class SelectionListContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedItem: null
        };

        this.selectItem = this.selectItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {selectedItem, items} = nextProps;

        if (selectedItem) {
            this.setState({
                selectedItem: items.find(item =>
                    item.id === selectedItem.roomId
                    && selectedItem.startTime === moment(item.time[0]).format(TIME_FORMAT)
                )
            });
        }
    }

    selectItem(item) {
        this.props.onRoomChange(item);
    }

    removeItem() {
        this.props.onRoomChange(null);
    }

    render() {
        let label, listItems;
        const {selectedItem} = this.state;

        if (selectedItem) {
            label = "Ваша переговорка";
            listItems =
                <SelectionListItem
                    key={selectedItem.id}
                    type="primary"
                    title={`
                        ${moment(selectedItem.time[0]).format(TIME_FORMAT)}
                        —
                        ${moment(selectedItem.time[1]).format(TIME_FORMAT)}
                    `}
                    subtitle={`${selectedItem.title} · ${selectedItem.floor}`}
                    icon="close"
                    iconColor="#FFFFFF"
                    onIconClick={this.removeItem}
                />;
        } else {
            label = "Рекомендованные переговорки";
            listItems = this.props.items.map(item =>
                <SelectionListItem
                    key={`${item.id}${item.time[0]}`}
                    type="default"
                    title={`
                        ${moment(item.time[0]).format(TIME_FORMAT)}
                        —
                        ${moment(item.time[1]).format(TIME_FORMAT)}
                    `}
                    subtitle={`${item.title} · ${item.floor}`}
                    onItemClick={() => this.selectItem(item)}
                />
            );
        }

        return (
            <SelectionListWrapper>
                <SelectionListLabel>
                    {label}
                </SelectionListLabel>
                <SelectionList>
                    {listItems}
                </SelectionList>
            </SelectionListWrapper>
        );
    }
}
