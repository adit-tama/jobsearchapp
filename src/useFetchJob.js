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
		case ACTIONS.UPDATE_HAS_NEXT_PAGE:
      		return { ...state, hasNextPage: action.payload.hasNextPage }
		default:
			return state
	}
}

export default function useFetchJobs(params,page) {
	const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true})
	
	useEffect(() => {
		// This is to abort api stream
		const cancelTokenUrl1 = axios.CancelToken.source();
		const cancelTokenUrl2 = axios.CancelToken.source();

		dispatch({ type: ACTIONS.MAKE_REQUEST })
	    axios.get(BASE_URL, {
	      cancelToken: cancelTokenUrl1.token,
	      params: { markdown: true, page: page, ...params }
	    }).then(res => {
	      dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } }) 
	    }).catch(e => {
	      if (axios.isCancel(e)) return
	      dispatch({ type: ACTIONS.ERROR, payload: { error: e } }) 
	    })

	     axios.get(BASE_URL, {
			  cancelToken: cancelTokenUrl2.token,
			  params: { markdown: true, page: page + 1, ...params }
			}).then(res => {
			  dispatch({ type: ACTIONS.UPDATE_HAS_NEXT_PAGE, payload: { hasNextPage: res.data.length !== 0 } }) 
			}).catch(e => {
			  if (axios.isCancel(e)) return
			  dispatch({ type: ACTIONS.ERROR, payload: { error: e } }) 
			})

		return () => {
			cancelTokenUrl1.cancel()
			cancelTokenUrl2.cancel()
		}
	}, [params,page])

	return state
}