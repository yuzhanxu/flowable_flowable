package com.dragon.flow.constant;

/**
 * @author : bruce.liu
 * @title: : FlowConstant
 * @projectName : flowable
 * @description: 常量
 * @date : 2019/11/1314:00
 */
public class FlowConstant {

    public static final String MAPPER_SCAN = "com.dragon.*.dao.*";

    /**
     * 提交人的变量名称
     */
    public static final String FLOW_SUBMITTER_VAR = "initiator";
    /**
     * 自动跳过节点设置属性
     */
    public static final String FLOWABLE_SKIP_EXPRESSION_ENABLED = "_FLOWABLE_SKIP_EXPRESSION_ENABLED";
}
