import ExpenseOutput from "../components/ExpenseOutput/ExpenseOutput"
import { useSelector } from "react-redux"

function AllExpenses() {
    const expenses = useSelector((state) => state.expense)
    return (
        <ExpenseOutput period='Total' expenses={expenses} />
    )
}

export default AllExpenses