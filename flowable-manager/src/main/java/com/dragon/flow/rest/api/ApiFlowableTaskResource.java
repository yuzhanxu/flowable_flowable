package com.dragon.flow.rest.api;

import com.dragon.flow.service.flowable.IFlowableProcessInstanceService;
import com.dragon.flow.service.flowable.IFlowableTaskService;
import com.dragon.flow.vo.flowable.CompleteTaskVo;
import com.dragon.flow.vo.flowable.ProcessInstanceQueryVo;
import com.dragon.flow.vo.flowable.TaskQueryVo;
import com.dragon.tools.common.ReturnCode;
import com.dragon.tools.pager.PagerModel;
import com.dragon.tools.pager.Query;
import com.dragon.tools.vo.ReturnVo;
import org.flowable.engine.history.HistoricProcessInstance;
import org.flowable.idm.api.User;
import org.flowable.task.api.Task;
import org.flowable.task.api.history.HistoricTaskInstance;
import org.flowable.ui.common.security.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author : bruce.liu
 * @title: : ApiFlowableTaskResource
 * @projectName : flowable
 * @description: 任务列表
 * @date : 2019/11/2115:34
 */
@RestController
@RequestMapping("/rest/task")
public class ApiFlowableTaskResource extends BaseResource {

    @Autowired
    private IFlowableTaskService flowableTaskService;
    @Autowired
    private IFlowableProcessInstanceService flowableProcessInstanceService;

    /**
     * 获取待办任务列表
     *
     * @param params 参数
     * @param query  查询条件
     * @return
     */
    @GetMapping(value = "/get-applying-tasks")
    public PagerModel<Task> getApplyingTasks(TaskQueryVo params, Query query) {
        setUserCode(params);
        PagerModel<Task> pm = flowableTaskService.getApplyingTasks(params, query);
        return pm;
    }

    /**
     * 获取已办任务列表
     *
     * @param params 参数
     * @param query  查询条件
     * @return
     */
    @GetMapping(value = "/get-applyed-tasks")
    public PagerModel<HistoricTaskInstance> getApplyedTasks(TaskQueryVo params, Query query) {
        setUserCode(params);
        PagerModel<HistoricTaskInstance> pm = flowableTaskService.getApplyedTasks(params, query);
        return pm;
    }

    /**
     * 获取已办任务列表
     *
     * @param params 参数
     * @param query  查询条件
     * @return
     */
    @GetMapping(value = "/my-processInstances")
    public PagerModel<HistoricProcessInstance> myProcessInstances(ProcessInstanceQueryVo params, Query query) {
        params.setUserCode(this.getLoginUser().getId());
        PagerModel<HistoricProcessInstance> pm = flowableProcessInstanceService.getMyProcessInstances(params, query);
        return pm;
    }

    /**
     * 审批任务
     *
     * @param params 参数
     * @return
     */
    @PostMapping(value = "/complete")
    public ReturnVo<String> complete(CompleteTaskVo params) {
        ReturnVo<String> returnVo = null;
        params.setUserCode(this.getLoginUser().getId());
        returnVo = flowableTaskService.complete(params);
        return returnVo;
    }

    private void setUserCode(TaskQueryVo params) {
        params.setUserCode(this.getLoginUser().getId());
    }

}