import {deleteToDo, ToDo} from "./ToDoService";
import {Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {DeleteOutline} from "@mui/icons-material";
// @ts-ignore
import React, {useState} from "react";

type ToDoProps = { initialToDo: ToDo; updateToDos:()=> void };
export const ToDoCard = ({initialToDo, updateToDos}: ToDoProps) => {

    const [toDo, setToDo] = useState<ToDo>(initialToDo);

    const handleClick = () => {
        setToDo((t) => ({
            ...t,
            status: t.status === 'complete' ? 'active' : 'complete'
        }))
    }




    return (
        <ListItem
            sx={{mt: 1, borderRadius: 1, backgroundColor: grey[900], overflow: "hidden"}}
            secondaryAction={
//for the delete button, change the aria-label style to "delete-button" to match test userEvent ... .getByLabelText
//include onClick to delete button to handle the click event by the deleteToDo function
                <IconButton
                    onClick={() => {
                        toDo.id && deleteToDo(toDo.id).then(updateToDos)
                    }}
                    color="error"
                    edge="end"
                    aria-label="delete-button">
                    <DeleteOutline/>
                </IconButton>
            }

            disablePadding>
            <ListItemButton
                role={undefined}
                dense
                onClick={handleClick}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={toDo.status === 'complete'}
                        tabIndex={-1}
                        disableRipple
                    />
                </ListItemIcon>
                <Typography fontSize="large">{toDo.text}</Typography>
            </ListItemButton>
        </ListItem>)
};