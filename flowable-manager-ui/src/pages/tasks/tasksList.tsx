import { Tabs, Card, Table } from 'antd';
import React, { PureComponent } from 'react';

const { TabPane } = Tabs;
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';

@connect(({ tasks, loading }: any) => ({
  loading: loading.models.tasks,
  applyingTasks: tasks.applyingTasks,
  applyedTasks: tasks.applyedTasks,
  myProcessInstances: tasks.myProcessInstances,
  total: tasks.total,
}))
class TaskList extends PureComponent<any, any> {
  state = {
    key: '1',
    applyingPageNum: 1,
    applyedPageNum: 1,
    myProcessPageNum: 1,
    applyingPageSize: 10,
    applyedPageSize: 10,
    myProcessPageSize: 10,
    formName: '',
  };

  //加载完成查询
  componentWillMount() {
    this.applying({ pageNum: 1, pageSize: 10 });
  }

  //查询待办
  applying = (payload: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tasks/fetchApplyingTasks',
      payload: payload,
    });
  };
  //查询已办
  applyed = (payload: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tasks/fetchApplyedTasks',
      payload: payload,
    });
  };
  //查询我的流程
  myProcessInstance = (payload: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tasks/fetchMyProcessInstancesTasks',
      payload: payload,
    });
    debugger;
  };

  //tabs切换
  onChange = (key: string) => {
    this.setState({
      key: key,
      pageNum: 0,
      formName: '',
    });
    switch (key) {
      case '1': {
        this.applying({ pageNum: 0 });
        break;
      }
      case '2': {
        this.applyed({ pageNum: 0 });
        break;
      }
      case '3': {
        this.myProcessInstance({ pageNum: 0 });
        break;
      }
      default: {
      }
    }
  };
  //待办分页点击
  applyingChangePage = (page: number) => {
    const { applyingPageSize } = this.state;
    this.setState(
      {
        applyingPageNum: page,
      },
      () => {
        this.applying({ pageNum: page, pageSize: applyingPageSize });
      },
    );
  };
  //已办分页点击
  applyedChangePage = (page: number) => {
    const { applyedPageSize } = this.state;
    this.setState(
      {
        applyedPageNum: page,
      },
      () => {
        this.applyed({ pageNum: page, pageSize: applyedPageSize });
      },
    );
  };
  //我的流程分页点击
  myProcessChangePage = (page: number) => {
    const { myProcessPageSize } = this.state;
    this.setState(
      {
        myProcessPageNum: page,
      },
      () => {
        this.myProcessInstance({ pageNum: page, pageSize: myProcessPageSize });
      },
    );
  };
  //待办修改pagesize
  applyingChangePageSize = (current: number, size: number) => {
    this.setState(
      {
        pageNum: current,
        pageSize: size,
      },
      () => {
        this.applying({ pageNum: current, pageSize: size });
      },
    );
  };
  //已办修改pagesize
  applyedChangePageSize = (current: number, size: number) => {
    this.setState(
      {
        pageNum: current,
        pageSize: size,
      },
      () => {
        this.applyed({ pageNum: current, pageSize: size });
      },
    );
  };
  //我的流程修改pagesize
  myProcessChangePageSize = (current: number, size: number) => {
    this.setState(
      {
        pageNum: current,
        pageSize: size,
      },
      () => {
        this.myProcessInstance({ pageNum: current, pageSize: size });
      },
    );
  };

  render() {
    const { loading, applyingTasks, applyedTasks, myProcessInstances, total } = this.props;
    const { applyingPageNum, applyedPageNum, myProcessPageNum } = this.state;
    const applyingPaginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      current: applyingPageNum,
      total: total,
      showTotal: (total: number) => `共 ${total} 条数据`,
      onChange: this.applyingChangePage,
      onShowSizeChange: this.applyingChangePageSize,
    };
    const applyedPaginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      current: applyedPageNum,
      total: total,
      showTotal: (total: number) => `共 ${total} 条数据`,
      onChange: this.applyedChangePage,
      onShowSizeChange: this.applyedChangePageSize,
    };
    const myProcessPaginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      current: myProcessPageNum,
      total: total,
      showTotal: (total: number) => `共 ${total} 条数据`,
      onChange: this.myProcessChangePage,
      onShowSizeChange: this.myProcessChangePageSize,
    };
    const applyingColumns = [
      {
        title: '名称',
        width: 100,
        dataIndex: 'formName',
        key: 'formName',
      },
      {
        title: '任务名称',
        width: 100,
        dataIndex: 'taskName',
      },
      {
        title: '系统',
        width: 100,
        dataIndex: 'systemSn',
      },
      {
        title: '创建时间',
        dataIndex: 'startTime',
        width: 150,
        render: (val: any) => (val ? <span>{moment(val).format('YYYY-MM-DD HH:mm')}</span> : ''),
      },
    ];
    const applyedColumns = [
      {
        title: '名称',
        width: 100,
        dataIndex: 'formName',
        key: 'formName',
      },
      {
        title: '任务名称',
        width: 100,
        dataIndex: 'taskName',
      },
      {
        title: '系统',
        width: 100,
        dataIndex: 'systemSn',
      },
      {
        title: '创建时间',
        dataIndex: 'startTime',
        width: 150,
        render: (val: any) => (val ? <span>{moment(val).format('YYYY-MM-DD HH:mm')}</span> : ''),
      },
      {
        title: '处理时间',
        dataIndex: 'endTime',
        width: 150,
        render: (val: any) => <span>{moment(val).format('YYYY-MM-DD HH:mm')}</span>,
      },
    ];
    const myProcessInstancesColumns = [
      {
        title: '名称',
        width: 100,
        dataIndex: 'formName',
      },
      {
        title: '审批人',
        width: 100,
        dataIndex: 'approver',
      },
      {
        title: '系统',
        dataIndex: 'systemSn',
        width: 150,
      },
      {
        title: '发起时间',
        dataIndex: 'startTime',
        width: 150,
        render: (val: any) => (val ? <span>{moment(val).format('YYYY-MM-DD HH:mm')}</span> : ''),
      },
      {
        title: '结束时间',
        dataIndex: 'endTime',
        width: 150,
        render: (val: any) =>
          val ? <span>{moment(val).format('YYYY-MM-DD HH:mm')}</span> : '未结束',
      },
    ];
    return (
      <PageHeaderWrapper title={''}>
        <Card>
          <div className="card-container">
            <Tabs type="card" defaultActiveKey={'1'} onChange={this.onChange}>
              <TabPane tab="待办任务" key="1">
                <Table
                  loading={loading}
                  rowKey="id"
                  bordered
                  columns={applyingColumns}
                  dataSource={applyingTasks}
                  pagination={applyingPaginationProps}
                />
              </TabPane>
              <TabPane tab="已办任务" key="2">
                <Table
                  loading={loading}
                  rowKey="id"
                  bordered
                  columns={applyedColumns}
                  dataSource={applyedTasks}
                  pagination={applyedPaginationProps}
                />
              </TabPane>
              <TabPane tab="我发起任务" key="3">
                <Table
                  loading={loading}
                  rowKey="id"
                  bordered
                  columns={myProcessInstancesColumns}
                  dataSource={myProcessInstances}
                  pagination={myProcessPaginationProps}
                />
              </TabPane>
            </Tabs>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default TaskList;
