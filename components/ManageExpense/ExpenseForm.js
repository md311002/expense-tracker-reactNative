import { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import Input from "./Input";
import Button from '../UI/Button'
import { useSelector } from "react-redux";
import { GlobalStyles } from "../../constants/styles";

export default function ExpenseForm({ onCancel, submitButtonLabel, onSubmit, id }) {
    const expenses = useSelector((state) => state.expense)
    let defaultExpense
    if (id) {
        defaultExpense = expenses.find((expense) => expense.id === id)
    }

    const [inputValue, setInputValues] = useState({
        amount: { value: defaultExpense ? defaultExpense.amount.toString() : '', isVlid: !!defaultExpense },
        date: { value: defaultExpense ? defaultExpense.date.toISOString().slice(0, 10) : '', isVlid: !!defaultExpense },
        description: { value: defaultExpense ? defaultExpense.description : '', isVlid: !!defaultExpense }
    })

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputValues((curInputValues) => {
            return {
                ...curInputValues,
                [inputIdentifier]: { value: enteredValue, isVlid: true }
            }
        })
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputValue.amount.value,
            date: new Date(inputValue.date.value),
            description: inputValue.description.value
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
        const descriptionIsValid = expenseData.description.trim().length > 0

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // Alert.alert('Invalid Input, Please check your input values')
            setInputValues((currentInputs) => {
                return {
                    amount: { value: currentInputs.amount.value, isVlid: amountIsValid },
                    date: { value: currentInputs.date.value, isVlid: dateIsValid },
                    description: { value: currentInputs.description.value, isVlid: descriptionIsValid }
                }
            })
            return
        }

        onSubmit(expenseData)
    }

    const formIsInValid = !inputValue.amount.isVlid || !inputValue.date.isVlid || !inputValue.description.isVlid

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputRow}>
                <Input
                    label='Amount'
                    isValid={!inputValue.amount.isVlid}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangeHandler.bind(this, 'amount'),
                        value: inputValue.amount.value
                    }}
                    style={{ flex: 1 }}
                />
                <Input
                    label='Date'
                    isValid={!inputValue.date.isVlid}
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, 'date'),
                        value: inputValue.date.value
                    }}
                    style={{ flex: 1 }}
                />
            </View>
            <Input
                label='Description'
                isValid={!inputValue.description.isVlid}
                textInputConfig={{
                    multiline: true,
                    onChangeText: inputChangeHandler.bind(this, 'description'),
                    value: inputValue.description.value
                }}
            />
            {formIsInValid && (
                <Text style={styles.errorText}>Invalid input values - please check values entered</Text>
            )}
            <View style={styles.buttonContainer}>
                <Button style={styles.button} mode='flat' onPress={onCancel} >Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: 40
    },
    title: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        marginVertical: 24,
        textAlign: 'center'
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        marginHorizontal: 8,
        minWidth: 120
    }
})