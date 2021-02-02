import { Component, ViewChild } from "@angular/core";
import { MatTable } from "@angular/material/table";

export interface LotteryDetails {
  position: number;
  lotteryDetail: string;
  occurance: number;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "lottery-app";
  lotteryInput: string;
  dataSource: LotteryDetails[] = [];
  displayedColumns: string[] = ["position", "lotteryDetail", "occurance"];

  @ViewChild(MatTable) table: MatTable<any>;

  addRepetatedData(dataInput: string) {
    if (dataInput.includes("-")) {
      return dataInput.split("-")[1];
    }
  }

  onClickSubmitBtn() {
    if (this.dataSource.length !== 0) {
      let loopResult = this.dataSource.filter((item) => {
        let localInput = this.lotteryInput.includes("-")
          ? this.lotteryInput.split("-")[0]
          : this.lotteryInput;
        if (item.lotteryDetail == localInput) {
          if (this.lotteryInput.includes("-")) {
            return (item.occurance += parseInt(
              this.lotteryInput.split("-")[1]
            ));
          } else {
            return (item.occurance += 1);
          }
        }
      });
      if (loopResult.length == 0) {
        let lotteryData = {
          position: this.dataSource.length + 1,
          lotteryDetail: this.lotteryInput.includes("-")
            ? this.lotteryInput.split("-")[0]
            : this.lotteryInput,
          occurance: this.lotteryInput.includes("-")
            ? parseInt(this.lotteryInput.split("-")[1])
            : 1,
        };
        this.dataSource.push(lotteryData);
      }
    } else {
      let lotteryData = {
        position: 1,
        lotteryDetail: this.lotteryInput.includes("-")
          ? this.lotteryInput.split("-")[0]
          : this.lotteryInput,
        occurance: this.lotteryInput.includes("-")
          ? parseInt(this.lotteryInput.split("-")[1])
          : 1,
      };
      this.dataSource.push(lotteryData);
    }
    this.lotteryInput = "";
    this.table.renderRows();
  }

  onClickRemoveBtn = () => {
    return (this.lotteryInput = "");
  };
}
