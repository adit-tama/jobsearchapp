import { useReducer, useEffect } from 'react';
import axios from "axios";

const ACTIONS = {
	MAKE_REQUEST: 'make-request',
	GET_DATA: 'get-data',
	ERROR: 'error'
}

const BASE_URL = '//cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json';

function reducer(state, action) {
	switch (action.type) {
		case ACTIONS.MAKE_REQUEST:
			return { loading: true, jobs: []}
		case ACTIONS.GET_DATA:
			return { ...state, loading: false, jobs: state.jobs.concat(action.payload.jobs)}
		case ACTIONS.ERROR:
			return { ...state, 
				loading: false, 
				error: action.payload.error, 
				jobs: []
			}
		default:
			return state
	}
}

export default function useFetchJobs(params) {
	const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true})
	
	useEffect(() => {
		// This is to abort api stream
		const cancelTokenUrl1 = axios.CancelToken.source();
		const cancelTokenUrl2 = axios.CancelToken.source();

		// let collectedJobs = []
		const getGithubJobs = axios.get(BASE_URL, {
				// cancelToken: cancelTokenUrl1,
				params: { markdown: true, ...params} 
			}).then(res => res.data)

		const collectJobs = async () => {
			return Promise.all([getGithubJobs]).then(res => {
				dispatch({ type: ACTIONS.GET_DATA, payload:{
					jobs: [...res[0]]
				} })
			})
		}
		
		dispatch({ type: ACTIONS.MAKE_REQUEST })
		collectJobs().catch((err) => {
			if(axios.isCancel(err)) return 
            dispatch({ type: ACTIONS.ERROR, payload:{ error: err } })
		})

		return () => {
			cancelTokenUrl1.cancel()
			cancelTokenUrl2.cancel()
		}
	}, [params])

	return state
}