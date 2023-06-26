import { PORT1 } from "@/api/config/servicePort"
import { TablePage } from "@/api/interface/index"
import http from "@/api"

// * 获取正念冥想分类
export const getMeditationCate = (param: TablePage.Retrieve) => {
	return http.get<TablePage.ResRetrieve>(PORT1 + `/meditation/cate`, param)
}
