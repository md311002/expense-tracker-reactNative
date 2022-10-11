import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ExpenseList from "./ExpenseList";
import ExpenseSummary from "./ExpenseSummary";

export default function ExpenseOutput({ expenses, period }) {

    return (
        <View style={styles.container}>
            <ExpenseSummary expenses={expenses} period={period} />
            <ExpenseList expenses={expenses} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingTop: 24,
        backgroundColor: GlobalStyles.colors.primary700,
        // backgroundColor:'white',
        flex: 1
    }
})