import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'Simple-timer';
  private $timer = interval(1000);
  public orginalVal = 5;
  private timeInMiliLeft = 0;
  public displayTimerText = '';
  public isStarted = false;
  private timerSubscription: Subscription | undefined;
  public percentage = 0;
  private firstStart = true;
  private orginaltimeInMili = 0;

  public ngOnInit(): void {
  }
  public start(): void {
    if (this.firstStart) {
      this.timeInMiliLeft = this.orginaltimeInMili = this.orginalVal * 60000;
      this.firstStart = false;
    }
    this.isStarted = true;
    this.setupTimer();
  }
  public stop(): void {
    this.timerSubscription?.unsubscribe();
    this.isStarted = false;
    this.timerSubscription = undefined;
  }
  public reset(): void {
    this.finishTimer();
  }
  private setupTimer(): void {
    this.timerSubscription = this.$timer.subscribe(() => {
      const timeleft = this.timeInMiliLeft;
      this.timeInMiliLeft = this.timeInMiliLeft - 1000;
      this.percentage = ((this.orginaltimeInMili - timeleft) / this.orginaltimeInMili) * 100;
      this.displayTimerText = this.getDisplayTime(timeleft);
      if (this.timeInMiliLeft < 0) {
        this.finishTimer();
        alert('Time is up!');
      }
    });
  }
  private finishTimer(): void {
    this.timerSubscription?.unsubscribe();
    this.firstStart = true;
    this.displayTimerText = '';
    this.isStarted = false;
    this.percentage = 0;
  }
  private getDisplayTime(timeleft: number): string {
    let seconds = timeleft / 1000;
    const hours = parseInt((seconds / 3600).toString());
    seconds = seconds % 3600;
    const minutes = parseInt((seconds / 60).toString());
    seconds = seconds % 60;
    const finalHours = (hours < 10) ? '0' + hours : hours;
    const finalMinutes = (minutes < 10) ? '0' + minutes : minutes;
    const finalSeconds = (seconds < 10) ? '0' + seconds : seconds;
    return finalHours + 'h' + ':' + finalMinutes + 'm' + ':' + finalSeconds + 's';
  }
  public ngOnDestroy(): void {
      this.timerSubscription?.unsubscribe();
  }
}
