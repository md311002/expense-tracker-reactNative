import { FlatList, Text, View } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderList(itemData) {
    return (
        <ExpenseItem {...itemData.item}></ExpenseItem>
    )
}

function ExpenseList({ expenses }) {
    return (
        <FlatList
            data={expenses}
            renderItem={renderList}
            keyExtractor={(item) => item.id}
        />
    )
}

export default ExpenseList