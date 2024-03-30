import { createContext,useState} from 'react';
const initial_page = 1;
export const ApplyTeacherContext = createContext({page:1});


export const ApplyTeacherProvider = ({children}) => {
    const [page,setPage] = useState(initial_page);
    const page_add = (num) =>{
        setPage(page+num);

    }
    return(
        <ApplyTeacherContext.Provider value={{page,page_add}}>
            {children}
        </ApplyTeacherContext.Provider>
    )
}