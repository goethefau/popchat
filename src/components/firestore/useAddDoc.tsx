import {useState} from "react";
import {CollectionReference, addDoc, DocumentReference} from "firebase/firestore"

interface State<T> {
    isLoading: boolean,
    error: Error | null,
}

function useAddDoc<T>(reference: CollectionReference) {
    const [state, setState] = useState<State<T>>({
        isLoading: false,
        error: null,
    })

    function send(data: T): Promise<DocumentReference> {
        setState({isLoading: true, error: null})
        return addDoc(reference, data)
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
        send,
        isLoading: state.isLoading,
        error: state.error,
    })
}

export default useAddDoc