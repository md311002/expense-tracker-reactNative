import ExpenseOutput from "../components/ExpenseOutput/ExpenseOutput"
import { useSelector } from "react-redux"
import { getDateMinusDays } from "../utils/date";

function RecentExpenses() {
    const expenses = useSelector((state) => state.expense)

    const recentExpenses = expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7)
        return expense.date >= date7DaysAgo
    })

    return (
        <ExpenseOutput period='Last 7 Days' expenses={recentExpenses} />
    )
}

export default RecentExpenses