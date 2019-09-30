import { all, fork, call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import { FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCEEDED, FETCH_TODOS_FAILED, MARK_TODO_AS_COMPLETED_REQUEST, MARK_TODO_AS_COMPLETED_SUCCEEDED, 
    REMOVE_ITEM_REQUEST, REMOVE_ITEM_SUCCEEDED, ADD_TODO_REQUEST, ADD_TODO_SUCCEEDED } from '../actions/actions';
    
export function* observeCallApiAction() {
    yield takeLatest(FETCH_TODOS_REQUEST, fetchTodos);
};

export function* observeMarkAsDoneAction() {
    yield takeEvery(MARK_TODO_AS_COMPLETED_REQUEST, markAsCompleted);
}

export function* observeRemoveItemAction() {
    yield takeEvery(REMOVE_ITEM_REQUEST, removeItem);
}

export function* observeAddTodoAction() {
    yield takeEvery(ADD_TODO_REQUEST, addTodo)
}