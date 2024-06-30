import { render, screen, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import ExperimentsList from "./experiments-list"
import { experiments } from "../../constants"

describe('should test experiment module', () => {
    test('should test module with no iterations', async () => {
        render(<ExperimentsList data={[experiments[0]]} />)
        const title = screen.getByText(/experiment module/i);

        expect(title).toBeInTheDocument()
        expect(screen.queryByText(/to add a new integration, start typing a prompt or /i)).toBeNull();
        await userEvent.click(title);
        const infoElement = screen.getByText(/to add a new integration, start typing a prompt or /i, { exact: false });
        expect(infoElement.textContent).toBe("To add a new integration, start typing a prompt or generate one.");

        const listItemElements = screen.queryAllByRole('listitem');
        expect(listItemElements).toHaveLength(0);
    })

    test('should test module with iterations', async () => {
        render(<ExperimentsList data={[experiments[1]]} />)
        const title = screen.getByText(/experiment module/i);
        userEvent.click(title);

        await waitFor(() => {
            const listItemElements = screen.queryAllByRole('listitem');
            expect(listItemElements).toHaveLength(3);
        })
    })

    test('should test adding an iteration', async () => {
        render(<ExperimentsList data={[experiments[1]]} />)
        const title = screen.getByText(/experiment module/i);
        await userEvent.click(title);

        const listItemElements = screen.queryAllByRole('listitem');
        const firstItem = screen.getByText(/EM-1/i);
        expect(listItemElements).toHaveLength(3);
        expect(firstItem).toBeInTheDocument()

        const addButton = screen.getByRole("button", { name: '+ Add Iteration' });
        await userEvent.click(addButton);

        const inputElement = screen.getByPlaceholderText("Iteration Title");
        const mediumTypeButton = screen.getByRole("button", { name: 'Medium Length' })
        expect(inputElement).toBeInTheDocument()
        await userEvent.type(inputElement, "Test Iteration 1");
        await userEvent.click(mediumTypeButton);

        const doneButton = screen.getByRole("button", { name: 'Done' });
        await userEvent.click(doneButton)

        const updatedListItems = screen.getAllByRole('listitem');
        expect(updatedListItems).toHaveLength(4);

        const addedListItem = screen.getByText(/EM-4/i);
        expect(addedListItem).toBeInTheDocument();
    })

    test('should not be able to add iteration to a locked module', async () => {
        render(<ExperimentsList data={[experiments[2]]} />)

        const title = screen.getByText(/experiment module/i);
        await userEvent.click(title);

        const addButton = screen.getByRole("button", { name: '+ Add Iteration' });
        await userEvent.click(addButton);

        const inputElement = screen.queryByPlaceholderText("Iteration Title");
        expect(inputElement).not.toBeInTheDocument()
    })

    test('should be able to lock a unlocked module', async () => {
        render(<ExperimentsList data={[experiments[1]]} />);

        const title = screen.getByText(/experiment module/i);
        await userEvent.click(title);

        const lockButton = screen.getByRole("button", { name: 'Lock' });
        await userEvent.click(lockButton);

        const addButton = screen.getByRole("button", { name: '+ Add Iteration' });
        await userEvent.click(addButton);

        const inputElement = screen.queryByPlaceholderText("Iteration Title");
        expect(inputElement).not.toBeInTheDocument()
    })

    test('should be able to unlock a locked module', async () => {
        render(<ExperimentsList data={[experiments[2]]} />);

        const title = screen.getByText(/experiment module/i);
        await userEvent.click(title);

        const lockButton = screen.getByRole("button", { name: 'Unlock' });
        await userEvent.click(lockButton);

        const addButton = screen.getByRole("button", { name: '+ Add Iteration' });
        await userEvent.click(addButton);

        const inputElement = screen.queryByPlaceholderText("Iteration Title");
        expect(inputElement).toBeInTheDocument()
    })

    test('should be able to reset', async () => {
        render(<ExperimentsList data={[experiments[0]]} />);

        const title = screen.getByText(/experiment module/i);
        await userEvent.click(title);

        const addButton = screen.getByRole("button", { name: '+ Add Iteration' });
        await userEvent.click(addButton);

        const inputElement = screen.getByPlaceholderText("Iteration Title");
        const mediumTypeButton = screen.getByRole("button", { name: 'Medium Length' })
        await userEvent.type(inputElement, "Test Iteration 1");
        await userEvent.click(mediumTypeButton);

        const doneButton = screen.getByRole("button", { name: 'Done' });
        await userEvent.click(doneButton)

        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(1);

        const resetButton = screen.getByRole("button", { name: 'Reset' });
        await userEvent.click(resetButton)

        const updatedListItems = screen.queryAllByRole('listitem');
        expect(updatedListItems).toHaveLength(0);
    })
})
