import { all, fork, call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import { FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCEEDED, FETCH_TODOS_FAILED, MARK_TODO_AS_COMPLETED_REQUEST, MARK_TODO_AS_COMPLETED_SUCCEEDED, 
REMOVE_ITEM_REQUEST, REMOVE_ITEM_SUCCEEDED, ADD_TODO_REQUEST, ADD_TODO_SUCCEEDED, SET_NEW_TODO_TITLE_SUCCEEDED, SET_NEW_TODO_TITLE_REQUEST } from '../actions/actions';
import callTodosApi from '../services/api'; 

function* fetchTodos() {
    const { res, err } = yield call(callTodosApi);
    if (res) {
        const dataItems = res.data;
        yield put({ type: FETCH_TODOS_SUCCEEDED, data: dataItems });
    } else {
        yield put({ type: FETCH_TODOS_FAILED, data: err.error });
    }    
}

//in the future we can connect api e.g. for db purposes (for now it could be one generator function but currently there is no api action so I left it as two similar generators)
function* markAsCompleted(action) {
    yield put({ type: MARK_TODO_AS_COMPLETED_SUCCEEDED, id: action.id});
}

function* removeItem(action) {
    yield put({ type: REMOVE_ITEM_SUCCEEDED, id: action.id });
}

function* addTodo() {
    yield put({ type: ADD_TODO_SUCCEEDED });
}

function* setInputValue(action) {
    yield put({ type: SET_NEW_TODO_TITLE_SUCCEEDED, title: action.title || '' });
}
/*Observers*/
function* observeIfTitleShouldBeChanged() {
    yield takeEvery(ADD_TODO_SUCCEEDED, setInputValue);
    yield takeEvery(SET_NEW_TODO_TITLE_REQUEST, setInputValue);
}

function* observeCallApiAction() {
    yield takeLatest(FETCH_TODOS_REQUEST, fetchTodos);
};

function* observeMarkAsDoneAction() {
    yield takeEvery(MARK_TODO_AS_COMPLETED_REQUEST, markAsCompleted);
}

function* observeRemoveItemAction() {
    yield takeEvery(REMOVE_ITEM_REQUEST, removeItem);
}

function* observeAddTodoAction() {
    yield takeEvery(ADD_TODO_REQUEST, addTodo)
}

export function* RootSaga() {
    yield all([
        fork(observeCallApiAction),
        fork(observeMarkAsDoneAction),
        fork(observeRemoveItemAction),
        fork(observeAddTodoAction),
        fork(observeIfTitleShouldBeChanged)
    ]);
};