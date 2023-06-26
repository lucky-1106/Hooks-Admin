import { useState, useEffect, useRef } from "react"
import { Table, Space, Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { getMeditationCate } from "@/api/modules/test"
import type { ColumnsType } from "antd/es/table"

import "./index.less"

interface DataType {
	title: string
	icon: string
	id: number
	sort: number
}

const View1 = () => {
	// 获取正念分类
	const getMeditation = async () => {
		const { data } = await getMeditationCate(pageOption.current)
		setDataSource(data!.rows)
		setTotal(data!.total)
	}

	const [dataSource, setDataSource] = useState<DataType[]>()
	const [total, setTotal] = useState(0)
	const pageOption = useRef({
		page: 1,
		page_size: 10
	})
	// 分页配置
	const paginationProps = {
		showQuickJumper: true,
		showSizeChanger: true,
		showTotal: () => `共${total}条`,
		total: total,
		pageSizeOptions: [10, 20, 50],
		current: pageOption.current.page,
		pageSize: pageOption.current.page_size,
		onChange: (current: number, size: number) => paginationChange(current, size)
	}
	// 当前页面切换
	const paginationChange = (current: number, size: number) => {
		console.log(current, size)
		pageOption.current = {
			page: current,
			page_size: size
		}
		getMeditation()
	}

	useEffect(() => {
		getMeditation()
	}, [])

	const columns: ColumnsType<DataType> = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			align: "center",
			width: 80
		},
		{
			title: "排序",
			dataIndex: "sort",
			key: "sort",
			align: "center",
			width: 100
		},
		{
			title: "标题",
			dataIndex: "title",
			key: "title",
			align: "center"
		},
		{
			title: "图标",
			dataIndex: "icon",
			key: "icon",
			width: 150,
			align: "center",
			render: (_, record) => (
				<div>
					<img src={record.icon} alt="" />
				</div>
			)
		},
		{
			title: "操作",
			dataIndex: "action",
			key: "action",
			fixed: "right",
			width: 240,
			align: "center",
			render: () => (
				<Space size="middle">
					<Button type="primary" shape="round">
						编辑
					</Button>
					<Button danger shape="round">
						删除
					</Button>
				</Space>
			)
		}
	]
	return (
		<div className="meditation-cate">
			<Button className="add" type="primary" icon={<PlusOutlined />}>
				新增分类
			</Button>
			<Table
				rowKey={record => record.id}
				bordered={true}
				dataSource={dataSource}
				columns={columns}
				pagination={paginationProps}
			/>
		</div>
	)
}

export default View1
