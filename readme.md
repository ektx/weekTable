# WeekTable

周报转表格。

用于将以下格式的周报转换成表格。

## 周报格式
```
项目名称: 关复汉室V1
GitLab: http://gitlab.hztianque.com/han
优先级: S
项目进度: 10%
上线时间: 2019/3/1
前端时间: 2019/2/28
是否迭代: 是
产品: 刘备
设计: 诸葛亮
前端: 赵云
开发: 黄总 魏延
测试: 刘禅
备注: 先灭曹操再灭孙权

项目名称: 关复汉室V2
GitLab: http://gitlab.hztianque.com/han
优先级: S
项目进度: 10%
上线时间: 2019/3/1
前端时间: 2019/2/28
是否迭代: 是
产品: 刘备
设计: 诸葛亮
前端: 关羽 张飞
开发: 黄总 魏延
测试: 刘禅
备注: 先灭曹操再灭孙权

```
多个项目时，用换行分隔。

## 输出表格
| 项目 | 状态 | 进度 | 赵云 | 关羽 | 张飞 |
| --- | --- | --- | --- | --- | --- |
| 关复汉室V1 | 正常 | 100% | ● | | |
| 关复汉室V2 | 正常 | 100% | | ● | ● |

### 状态规则
- 正常 生成表格时间小于前端时间
- 异常 生成表格时间大于前端时间
