import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SET_NEW_TODO_TITLE, ADD_TODO_REQUEST } from '../actions/actions';
import { THEME_BG_COLOR, THEME_COMPLETED_FONT_COLOR} from '../common/styles';

const AddTodoContainer = styled.header`
    display: flex;
    background-color: ${THEME_BG_COLOR};
    justify-content: center;
    padding-top: .5rem;
    padding-bottom: .5rem;
`;

const AddTodoUI = styled.div`
    display: flex;
    width: 90vw;
`;

const AddTodoInput = styled.input`
    background-color: transparent;
    border: none;
    border-bottom: 1px solid;
    padding: .5rem;
    flex-basis: 100%;
`;

const AddTodoButton = styled.button`
    cursor: pointer;
    margin-left: 1rem;
    white-space: nowrap;
    background-color: ${THEME_COMPLETED_FONT_COLOR};
    border: none;
    border-radius: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    font-weight: bolder;
`;

class AddTodo extends React.Component {

    setNewTodoTitle = title => this.props.dispatch({ type: SET_NEW_TODO_TITLE, title });

    addTodo = () => this.props.dispatch({ type: ADD_TODO_REQUEST });

    render() {
        return (
            <AddTodoContainer>
                <AddTodoUI title={ !this.props.canAddTodo ? "Sorry you can't add another Todo because list is full (MAX:10)" : null }>
                    <AddTodoInput onBlur={ e => this.setNewTodoTitle(e.target.value) } type="text" placeholder="Add Todo" disabled={ !this.props.canAddTodo }/>
                    <AddTodoButton onClick={ e => this.addTodo() } disabled={ !this.props.canAddTodo }>Add Todo</AddTodoButton>
                </AddTodoUI>
            </AddTodoContainer>
        );
    }
}

AddTodo.propTypes = {
    canAddTodo: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    canAddTodo: state.todosReducer.canAddTodo
});

export default connect(mapStateToProps)(AddTodo);

