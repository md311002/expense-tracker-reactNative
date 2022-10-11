import { useLayoutEffect, } from "react"
import { StyleSheet, View } from "react-native"
import IconButton from "../components/UI/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { GlobalStyles } from '../constants/styles'

import { deleteExpense, addExpense, updateExpense } from '../redux/actions/expense'
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpense({ route, navigation }) {
    const dispatch = useDispatch()
    const expenses = useSelector((state) => state.expense)
    const editExpenseId = route.params?.expenseId;
    const editMode = !!editExpenseId

    useLayoutEffect(() => {
        navigation.setOptions({
            title: editMode ? 'Edit Expense' : 'Add Expense'
        })

    }, [editMode, navigation])

    function deleteHandler() {
        dispatch(deleteExpense(editExpenseId))
        navigation.goBack()
    }
    function cancelHandler() {
        navigation.goBack()
    }
    function confirmHandler(expenseData) {
        if (editMode) {
            dispatch(updateExpense(editExpenseId, expenseData))
        }
        else {
            dispatch(addExpense(expenseData))
        }
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <ExpenseForm
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                submitButtonLabel={editMode ? 'Update' : 'Add'}
                id={editExpenseId}
            />

            {editMode &&
                <View style={styles.deleteContainer}>
                    <IconButton
                        name='trash'
                        size={36}
                        color={GlobalStyles.colors.error500}
                        onPress={deleteHandler}
                    ></IconButton>
                </View>}
        </View>
    )
}

export default ManageExpense

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.primary800,
        padding: 24,

    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    },

})