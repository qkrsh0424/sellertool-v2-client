import { useMutation, useQuery } from "@tanstack/react-query";
import { CustomErrorHandler } from "../../../data_connect/CustomErrorHandler";
import { ExcelTranslatorDataConnect } from "../../../data_connect/ExcelTranslatorDataConnect";
import { GlobalReactQueryUtils } from "../../../react-query/GlobalReactQueryUtils";

const globalReactQueryUtils = GlobalReactQueryUtils();
const excelTranslatorDataConnect = ExcelTranslatorDataConnect.baseExcelEditorPage();

export function ExcelTranslatorReactQuery(props) {
    return {
        /**
         * @example
         * const excelTranslatorReactQuery = ExcelTranslatorReactQuery();
         * const RQ_ExcelTranslatorList = excelTranslatorReactQuery.useFetchList( { headers: { wsId:wsId } } );
         * 
         */
        useFetchList: ({ headers }) => {
            const wsId = headers?.wsId;

            return useQuery({
                queryKey: globalReactQueryUtils.generateQueryKey(globalReactQueryUtils.queryKeys.EXCEL_TRANSLATOR_LIST, globalReactQueryUtils.queryKeyPaths.EXCEL_EDITOR, { wsId: wsId }),
                queryFn: () => excelTranslatorDataConnect.searchList({ headers: { wsId: wsId } }),
                enabled: !!wsId,
                ...globalReactQueryUtils.customDefaultOptionsForUseQuery,
            });
        },
        useCreateOne: () => {
            return useMutation({
                mutationFn: ({ params, body, headers }) => excelTranslatorDataConnect.create({ params, body, headers }),
                onError: (error) => {
                    CustomErrorHandler.errorReactQuery(error);
                },
            })
        }
    }
}