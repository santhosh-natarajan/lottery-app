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

  splitingInputs() {
    let splittedInputs = [];
    this.lotteryInput.split("\n").filter((item) => {
      return splittedInputs.push(item.trim());
    });
    return splittedInputs;
  }

  onClickSubmitBtn() {
    let processedInputs = this.splitingInputs();
    const checkIncludes = (data) =>
      data.lotteryDetail == processedInputs[0].split("-")[0];
    if (this.dataSource.length !== 0 && processedInputs[0].includes("-")) {
      let duplicateCheck = this.dataSource.some(checkIncludes);
      if (duplicateCheck) {
        this.dataSource.map((item) => {
          processedInputs.filter((processedInput) => {
            if (item.lotteryDetail == processedInput.split("-")[0]) {
              return (item.occurance += parseInt(processedInput.split("-")[1]));
            }
          });
        });
      } else {
        let userInput = this.lotteryInput.split("\n");
        userInput.map((item, index) => {
          let lotteryData = {
            position: this.dataSource.length + 1,
            lotteryDetail: item.trim().includes("-")
              ? item.trim().split("-")[0]
              : item.trim(),
            occurance: item.trim().includes("-")
              ? parseInt(item.trim().split("-")[1])
              : 1,
          };
          this.dataSource.push(lotteryData);
        });
      }
    } else {
      let userInput = this.lotteryInput.split("\n");
      userInput.map((item, index) => {
        let lotteryData = {
          position: this.dataSource.length + 1,
          lotteryDetail: item.trim().includes("-")
            ? item.trim().split("-")[0]
            : item.trim(),
          occurance: item.trim().includes("-")
            ? parseInt(item.trim().split("-")[1])
            : 1,
        };
        this.dataSource.push(lotteryData);
      });
    }
    this.lotteryInput = "";
    this.table.renderRows();
  }

  onClickRemoveBtn = () => {
    return (this.lotteryInput = "");
  };
}
