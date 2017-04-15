import {IQueryParameter} from "../models/interfaces/IQueryParameter";
export class UrlHelper {

    public static createQueryParamtersString(parameters: IQueryParameter[]) {

        let parametersString = '?';

        for(let i = 0; i < parameters.length; i = i + 1) {
            if(i == parameters.length - 1){
                parametersString = parametersString + parameters[i].key + '=' + parameters[i].key;
            } else {
                parametersString = parametersString + parameters[i].key + '=' + parameters[i].key + '&'
            }
        }

        return parametersString;

    }

}