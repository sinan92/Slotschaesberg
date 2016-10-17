import * as types from './types'

export function setSearchedRecipes( {recipes} ){
	return{
		type: types.SET_SEARCHED_RECIPES,
		recipes
	}
}