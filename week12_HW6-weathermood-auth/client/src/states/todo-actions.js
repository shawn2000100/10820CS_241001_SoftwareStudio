import {
    listTodos as listTodosFromApi,
    createTodo as createTodoFromApi,
    accomplishTodo as accomplishTodoFromApi
} from 'api/todos.js';

/*  Todo Form */

export function input(value) {
    return {
        type: '@TODO_FORM/INPUT',
        value
    };
};

export function inputDanger(danger) {
    return {
        type: '@TODO_FORM/INPUT_DANGER',
        danger
    };
};

export function toggleMood() {
    return {
        type: '@TODO_FORM/TOGGLE_MOOD'
    };
};

export function setMoodToggle(toggle) {
    return {
        type: '@TODO_FORM/SET_MOOD_TOGGLE',
        toggle
    };
};

export function selectMood(mood) {
    return {
        type: '@TODO_FORM/SELECT_MOOD',
        mood
    };
};


/*  Todos */

function startLoading() {
    return {
        type: '@TODO/START_LOADING'
    };
}

function endLoading() {
    return {
        type: '@TODO/END_LOADING'
    };
}

function endListTodos(todos) {
    return {
        type: '@TODO/END_LIST_TODOS',
        todos
    };
}

export function listTodos(searchText, loading = false) {
    return (dispatch, getState) => {
        if (!loading)
            dispatch(startLoading());

        return listTodosFromApi(getState().todo.unaccomplishedOnly, searchText).then(todos => {
            dispatch(endListTodos(todos));
            dispatch(endLoading());
        }).catch(err => {
            console.error('Error listing todos', err);
            dispatch(endLoading());
        });
    }
}

export function createTodo(mood, text) {
    return (dispatch, getState) => {
        dispatch(startLoading());

        return createTodoFromApi(mood, text).then(() => {
            dispatch(listTodos(getState().searchText, true));
        }).catch(err => {
            console.error('Error creating todos', err);
            dispatch(endLoading());
        });
    };
};

export function accomplishTodo(id) {
    return (dispatch, getState) => {
        dispatch(startLoading(true));

        return accomplishTodoFromApi(id).then(() => {
            dispatch(listTodos(getState().searchText, true));
        }).catch(err => {
            console.error('Error accomplishing todos', err);
            dispatch(endLoading());
        });
    }
}

function toggleUnaccomplishedOnly() {
    return {
        type: '@TODO/TOGGLE_UNACCOMPLISHED_ONLY'
    };
}

export function toggleAndList() {
    return (dispatch, getState) => {
        dispatch(toggleUnaccomplishedOnly());
        return dispatch(listTodos(getState().searchText));
    }
}
