import React from "react";
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { observer } from "mobx-react";
import { Person, Delete } from "@mui/icons-material";

interface Props {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
}

const UserListItem = observer(({id, firstName, lastName, age}: Props) => {
    return (
        <ListItem
            key={id}
            secondaryAction={
                <IconButton edge='end'>
                    <Delete/>
                </IconButton>
            }
        >
                <ListItemAvatar>
                    <Avatar>
                        <Person/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText>
                    {firstName} {lastName} {age}
                </ListItemText>
        </ListItem>
    )
})

export default UserListItem;