import {useState} from "react";
import {doc, deleteDoc, DocumentReference} from "firebase/firestore";

interface State<T> {
    isLoading: boolean,
    error: Error | null,
}

function useRemoveDoc<T>() {
    const [state, setState] = useState<State<T>>({
        isLoading: false,
        error: null,
    })

    function remove(ref: DocumentReference<unknown>) {
        setState({isLoading: true, error: null})
        return deleteDoc(ref)
            .then((data) => {
                setState({isLoading: false, error: null})
                return data
            })
            .catch((e) => {
                setState({isLoading: false, error: e})
                return e
            })
    }

    return ({
        remove,
        isLoading: state.isLoading,
        error: state.error,
    })
}

export default useRemoveDoc