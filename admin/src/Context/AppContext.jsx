import { createContext ,useState } from "react";

export const AppContext = createContext()
const AppContextProvider =(props) =>{

    const currencySymbol ='$'

    const calculateAge = (dob)=>{
        const today = new Date()
        const birthDate = new Date(dob)

        let age = today.getFullYear()-birthDate.getFullYear()
        return age


    }
    const [months] = useState(["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"])

  const slotDateFormate = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]

  }
    const value = {
        calculateAge,
        slotDateFormate,
        currencySymbol

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}

        </AppContext.Provider>
    )

}

export default AppContextProvider