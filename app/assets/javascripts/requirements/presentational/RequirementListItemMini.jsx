import React from 'react';

export default class RequirementListItemMini extends React.Component {

    render() {
        const requirement = this.props.requirement;
        return (
            <tr className="requirement-row">
                <td>{requirement.name}</td>
                <td>{requirement.description}</td>
            </tr>

        );
    }
}