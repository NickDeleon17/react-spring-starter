import {render, screen, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {ToDoListPage} from "../ToDoListPage";
import {expect} from "vitest";
import * as toDoService from '../ToDoService'

describe('ToDoList', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })
//Function walkthrough - add  "delete" functionality to the to-do List using TDD




    it('should call delete todo when delete button is clicked', async () => {
        const expected = [
            {id: 10, text: 'incomplete task', status: 'active'},
            {id: 11, text: 'complete task', status: 'complete'},
        ]
        const mockFetchToDos = vi.spyOn(toDoService, 'fetchToDos')
            .mockResolvedValue(expected);
        const mockDeleteToDo = vi.spyOn(toDoService, 'deleteToDo')
            .mockResolvedValue();
        render(<ToDoListPage/>);
        const listItems = await screen.findAllByRole('listitem');
        const toDoToDelete = listItems[0];
        await userEvent.click(within(toDoToDelete).getByLabelText('delete-button'))
        expect(mockDeleteToDo).toHaveBeenCalledOnce();
        expect(mockDeleteToDo).toHaveBeenCalledWith(10);
        expect(mockFetchToDos).toHaveBeenCalledTimes(2);
    });

//line 16: This line defines a test case using the 'it' function. The string describes what the test is checking: it expects that when a button is clicked, a function to delete a to-do item will be called.
//line 17-19: Here, an array called expected is defined, containing two to-do items. This represents the data that should be fetched and rendered by the ToDoListPage component.
//line 21: vi.spyOn is used to create a spy on the deleteToDo method of the toDoService object. This means that instead of calling the actual method, it will track calls to it.
//line 22: .mockResolvedValue() is used to specify that when deleteToDo is called, it should return a resolved promise. This is useful for simulating asynchronous behavior without actually performing the deletion.
//line 25: This line renders the ToDoListPage component in a testing environment. The component will be mounted, and any interactions with it (like button clicks) can be tested.
//line 26-27: This part uses screen.findAllByRole to find all list items (presumably representing the todos). The first item is stored in toDoToDelete, which is the one that will be deleted in the test.
//line 29: This line simulates a click on the delete button associated with the toDoToDelete item. The within function scopes the search for the delete button to just the toDoToDelete element, ensuring it finds the correct button. The button is identified by its label, which is 'delete-button'.
// test sets up a scenario where it expects that a button in the ToDoListPage component will trigger a call to the deleteToDo method in toDoService. The deleteToDo method is mocked so that it doesn’t perform its real function but instead simulates the behavior for testing purposes
//line 29: added expect; test will fail because we are expecting the event to be called once and actually called 0 times
// **Running the test will fail because until the deleteToDo function is created in the ToDoService file. - See ToDoServiceTest.java
// **After exporting deleteToDo function, and mocking the test conditions; test will fail for being "unable to find a label with the text of: delete-button"



    it('should call delete todo when delete button is clicked', async () => {
        const expected = [
            {id: 10, text: 'incomplete task', status: 'active'},
            {id: 11, text: 'complete task', status: 'complete'},
        ]
        const mockFetchToDos = vi.spyOn(toDoService, 'fetchToDos')
            .mockResolvedValue(expected);
        const mockDeleteToDo = vi.spyOn(toDoService, 'deleteToDo')
            .mockResolvedValue();
        render(<ToDoListPage/>);
        const listItems = await screen.findAllByRole('listitem');
        const toDoToDelete = listItems[0];
        await userEvent.click(within(toDoToDelete).getByLabelText('delete-button'))
        expect(mockDeleteToDo).toHaveBeenCalledOnce();
        expect(mockDeleteToDo).toHaveBeenCalledWith(10);
        expect(mockFetchToDos).toHaveBeenCalledTimes(2);
    });

    it('should not call createToDo if no text has been entered', async () => {
        vi.spyOn(toDoService, 'fetchToDos').mockResolvedValue([]);
        const mockCreateToDo = vi.spyOn(toDoService, 'createToDo')
            .mockRejectedValue('createToDo was called, but should not have been');
        render(<ToDoListPage/>)
        const addButton = screen.getByRole('button', {name: 'Add'});
        await userEvent.click(addButton);
        expect(mockCreateToDo).not.toHaveBeenCalled();
    });

    it('should display existing tasks with checkboxes checked if complete', async () => {
        const expected = [
            {id: 10, text: 'incomplete task', status: 'active'},
            {id: 11, text: 'complete task', status: 'complete'},
        ]
        const mockFetchToDos = vi.spyOn(toDoService, 'fetchToDos')
            .mockResolvedValue(expected);

        render(<ToDoListPage/>)
        expect(mockFetchToDos).toHaveBeenCalledOnce();
        expect(await screen.findByText('incomplete task')).toBeVisible();
        expect(await screen.findByText('complete task')).toBeVisible();
        const checkboxes = await screen.findAllByRole('checkbox');
        expect(checkboxes[0]).not.toBeChecked();
        expect(checkboxes[1]).toBeChecked();
    });
});