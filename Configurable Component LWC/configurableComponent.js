import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getBasicReport1 from '@salesforce/apex/ReportsValues.getBasicReport1'
import getBasicReport2 from '@salesforce/apex/ReportsValues.getBasicReport2'
import getBasicReport3 from '@salesforce/apex/ReportsValues.getBasicReport3'


export default class GrowthLWC extends NavigationMixin(LightningElement) {
   

    @api titleA;
    @api titleB;
    @api titleC;

    @api taskLabel = '%';
    @api taskGoal1 = 100;
    @api taskGoal2 = 100;
    @api taskGoal3 = 100;
    @api tasksCompleted = 30;
    @api hideComponent1 = false;
    @api hideComponent2 = false;
    @api hideComponent3 = false;
    @api hideBar1 = false;
    @api hideBar2 = false;
    @api hideBar3 = false;
    @api hideScorecard1 = false;
    @api hideScorecard2 = false;
    @api hideScorecard3 = false;
    @api scoreText1='';
    @api scoreText2='';
    @api scoreText3='';

    @api taskReportId1;
    @api taskReportId2;
    @api taskReportId3;
    @wire(getBasicReport1, {reportId1: '$taskReportId1'}) taskReportResponse1;
    @wire(getBasicReport2, {reportId2: '$taskReportId2'}) taskReportResponse2;
    @wire(getBasicReport3, {reportId3: '$taskReportId3'}) taskReportResponse3;
    
    get tasksCompletedStyleSyntax1() {
        return 'width: ' + this.tasksCompletedPercent1.toString() + '%' + ';background:' + '#4bca81' + ';'
    }
    get tasksCompletedStyleSyntax2() {
        return 'width: ' + this.tasksCompletedPercent2.toString() + '%' + ';background:' + '#4bca81' + ';'
    }
    get tasksCompletedStyleSyntax3() {
        return 'width: ' + this.tasksCompletedPercent3.toString() + '%' + ';background:' + '#4bca81' + ';'
    }

    get tasksCompletedPercent1() {
        return Math.min(Math.max(this.taskKpi1, 0.00001), this.taskGoal1) / this.taskGoal1 * 100;
    }
    get tasksCompletedPercent2() {
        return Math.min(Math.max(this.taskKpi2, 0.00001), this.taskGoal2) / this.taskGoal2 * 100;
    }
    get tasksCompletedPercent3() {
        return Math.min(Math.max(this.taskKpi3, 0.00001), this.taskGoal3) / this.taskGoal3 * 100;
    }

    get taskKpi1() {
        return this.round(this.taskReportResponse1.data, 2) ? this.round(this.taskReportResponse1.data, 2) : 0;
    }
    
    get taskKpi2() {
        return this.round(this.taskReportResponse2.data, 2) ? this.round(this.taskReportResponse2.data, 2) : 0;
    }
    
    get taskKpi3() {
        return this.round(this.taskReportResponse3.data, 2) ? this.round(this.taskReportResponse3.data, 2) : 0;
    }
    
    navigateToTask1(evt) {
        this.navigationBase(evt, this.taskReportId1);
    }
    navigateToTask1(evt) {
        this.navigationBase(evt, this.taskReportId2);
    }
    navigateToTask1(evt) {
        this.navigationBase(evt, this.taskReportId3);
    }


    navigationBase(evt, reportId) {
        evt.preventDefault();
        evt.stopPropagation();

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: reportId,
                objectApiName: 'Report',
                actionName: 'view'
            }
        });
    }
    
    round(value, decimals) {
        if (value)
        {
            return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
        }else{
            return undefined;
        }
    }
}