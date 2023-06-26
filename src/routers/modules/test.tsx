import React from "react"
import lazyLoad from "@/routers/utils/lazyLoad"
import { LayoutIndex } from "@/routers/constant"
import { RouteObject } from "@/routers/interface"

// 测试模块
const testViewRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "测试"
		},
		children: [
			{
				path: "/testView/view1",
				element: lazyLoad(React.lazy(() => import("@/views/testView/view1/index"))),
				meta: {
					requiresAuth: true,
					title: "测试1",
					key: "view1"
				}
			},
			{
				path: "/testView/view2",
				element: lazyLoad(React.lazy(() => import("@/views/testView/view2/index"))),
				meta: {
					requiresAuth: true,
					title: "测试2",
					key: "view2"
				}
			}
		]
	}
]

export default testViewRouter
