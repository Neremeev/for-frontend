import React from "react";
import {Autocomplete} from "../../components/autocomplete";
import {ChipList} from "../../components/chip-list";
import {Column} from "../../common-style";

export class AutocompleteChipsContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedItems: []
        };

        this.titleKey = props.titleKey;
        this.subtitleKey = props.subtitleKey;
        this.avatarKey = props.avatarKey;
        this.placeholder = props.placeholder;
        this.label = props.label;

        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {selectedItems, items} = nextProps;

        if (items) {
            this.setState({
                selectedItems: selectedItems.map(itemId =>
                    items.find(item => item.id === itemId)
                )
            });
        }
    }

    addItem(itemId) {
        const {onPropChange} = this.props;
        const {selectedItems} = this.state;
        const index = selectedItems.findIndex(item => item.id === itemId);

        if (!~index) {
            const selectedIds = selectedItems.map(item => item.id);

            selectedIds.push(itemId);
            onPropChange(selectedIds);
        }
    }

    removeItem(e) {
        const {itemId} = e.currentTarget.dataset;
        const {onPropChange} = this.props;
        const {selectedItems} = this.state;
        const selectedIds = selectedItems.map(item => item.id);
        const index = selectedIds.indexOf(itemId);

        selectedIds.splice(index, 1);
        onPropChange(selectedIds);
    }

    render() {
        const {selectedItems} = this.state;

        return (
            <Column>
                <Autocomplete
                    {...this.props}
                    onItemSelect={this.addItem}
                />
                <ChipList
                    titleKey={this.titleKey}
                    avatarKey={this.avatarKey}
                    items={selectedItems}
                    onChipIconClick={this.removeItem}
                />
            </Column>
        );
    }
}
