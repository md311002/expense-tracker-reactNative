import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { formattedDate } from "../../utils/date";

import { useNavigation } from "@react-navigation/native";

export default function ExpenseItem({ id, description, amount, date }) {
    const navigation = useNavigation();

    function pressHandler() {
        navigation.navigate('ManageExpense', {
            expenseId: id
        });

    }

    return (
        <Pressable
            onPress={pressHandler}
            style={({ pressed }) => pressed && styles.pressed}
        >
            <View style={styles.expenseItem}>
                <View >
                    <Text style={[styles.textBase, styles.description]}>{description}</Text>
                    <Text style={styles.textBase}>{formattedDate(date)}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>₹{amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75
    },
    expenseItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowOpacity: 0.4,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 4
    },
    textBase: {
        color: GlobalStyles.colors.primary50
    },
    description: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: 'white'
    },
    amount: {
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary500
    }
})