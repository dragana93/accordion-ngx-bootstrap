import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormArray,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-accordion",
  templateUrl: "./accordion.component.html",
  styleUrls: ["./accordion.component.css"],
})
export class AccordionComponent implements OnInit {
  accordionForm: FormGroup;
  model: any = [];
  damage_events: any;
  equipments_was: any;

  constructor(private fb: FormBuilder) {
    this.damage_events = [
      {
        key: "terminal",
        value: "Terminal",
      },
      {
        key: "payment_system",
        value: "Payment system",
      },
    ];

    this.equipments_was = [
      {
        key: "damaged",
        value: "Damaged",
      },
      {
        key: "stolen",
        value: "Stolen",
      },
      {
        key: "lost",
        value: "Lost",
      },
    ];

    this.model = [
      {
        general_info: {
          max_outlet: "Outlet 1",
          contact_email: "test@gmail.com",
          contact_phone_number: "56188014578",
        },
        specify_your_issue: [
          {
            issue_id: 12,
            damage_event_of: "Terminal",
            isTerminal: true,
            isPaymentSystem: false,
            equipment_was: "Damaged",
            isDamaged: true,
            isLost: false,
            isStolen: false,
            terminal_type: "IWL221GPRSCL_GPRS",
            terminal_id: 456086,
            serial_number: 45026000106544,
            equipment: "Stylus",
          },
          {
            issue_id: 123,
            damage_event_of: "Payment system",
            isTerminal: false,
            isPaymentSystem: true,
            equipment_was: "Lost",
            isDamaged: false,
            isLost: true,
            isStolen: false,
            terminal_type: "IWL221GPRSCL_GPRS",
            terminal_id: 2222222,
            serial_number: 45026000106544,
            equipment: "Stylus",
          },
        ],
      },
    ];
  }

  ngOnInit() {
    this.composeForm(this.model[0]);
  }

  onSubmit() {
    let data = this.accordionForm.getRawValue();

    // console.log("DATA FOR SUBMIT ", data);
  }

  onDemageItemChange(item, issue) {
    // console.log("onDemageItemChange value ", item.value);

    // console.log("ISSUEEE ", issue);

    if (item.key === "terminal") {
      issue.isTerminal = true;
      issue.isPaymentSystem = false;
    } else if (item.key === "payment_system") {
      issue.isTerminal = false;
      issue.isPaymentSystem = true;
    }
  }

  onEquipmentItemChange(item, issue) {
    // console.log("equipment ", item);
    // console.log("ISSUE EQUIPMENT  ", issue);

    if (item.key === "stolen") {
      issue.isStolen = true;
      issue.isDamaged = false;
      issue.isLost = false;
      // issue.equipment_was = "Stolen";
    } else if (item.key === "damaged") {
      issue.isStolen = false;
      issue.isDamaged = true;
      issue.isLost = false;
      // issue.equipment_was = "Damaged";
    } else if (item.key === "lost") {
      issue.isStolen = false;
      issue.isDamaged = false;
      issue.isLost = true;
      // issue.equipment_was = "Lost";
    }
  }

  get specify_your_issue() {
    return this.accordionForm.get("specify_your_issue") as FormArray;
  }

  addAnother(issue?) {
    // const found = this.model[0].specify_your_issue.some(
    //   (el) => el.issue_id === issue.issue_id
    // );
    // let element = this.model[0].specify_your_issue.find(
    //   (el) => el.issue_id === issue.outlet_id
    // );

    // console.log("ELEMENT ", element);

    let iss_id = Math.floor(Math.random() * 10) + 100;

    let data = (this.accordionForm.get("specify_your_issue") as FormArray)
      .controls;
    console.log(" DATA 1", data);
    // debugger;
    let data2 = JSON.parse(JSON.stringify(this.accordionForm.value));

    console.log(" DATA 2", data2);

    (this.accordionForm.get("specify_your_issue") as FormArray).push(
      new FormGroup({
        damage_event_of: this.fb.control("Terminal"),
        equipment_was: this.fb.control("Damaged"),
        terminal_type: this.fb.control("GA"),
        terminal_id: this.fb.control("5245254"),
        serial_number: this.fb.control("253452"),
        equipment: this.fb.control("element.equipment"),
      })
    );
    // {
    //   issue_id: 123,
    //   damage_event_of: "Payment system",
    //   isTerminal: false,
    //   isPaymentSystem: true,
    //   equipment_was: "Lost",
    //   isDamaged: false,
    //   isLost: true,
    //   isStolen: false,
    //   terminal_type: "IWL221GPRSCL_GPRS",
    //   terminal_id: 2222222,
    //   serial_number: 45026000106544,
    //   equipment: "Stylus",
    // },
  }

  deleteIssue(terminal_id) {
    debugger;
    this.model[0].specify_your_issue = this.model.specify_your_issue.filter(
      (item) => terminal_id !== item.terminal_id
    );
  }

  private composeForm(model?) {
    let specify_your_issue = new FormArray([]);

    let general_info = new FormGroup({
      max_outlet: new FormControl(""),
      contact_email: new FormControl(""),
      contact_phone_number: new FormControl(""),
    });

    if (model.general_info) {
      general_info = this.fb.group({
        max_outlet: this.fb.control(
          model.general_info.max_outlet,
          Validators.required
        ),
        contact_email: this.fb.control(
          model.general_info.contact_email,
          Validators.required
        ),
        contact_phone_number: this.fb.control(
          model.general_info.contact_phone_number,
          Validators.required
        ),
      });
    }

    if (model.specify_your_issue) {
      model.specify_your_issue.forEach((element) => {
        // console.log(element.equipment_was);
        specify_your_issue.push(
          new FormGroup({
            damage_event_of: this.fb.control(element.damage_event_of),
            equipment_was: this.fb.control(element.equipment_was),
            terminal_type: this.fb.control(element.terminal_type),
            terminal_id: this.fb.control(element.terminal_id),
            serial_number: this.fb.control(element.serial_number),
            equipment: this.fb.control(element.equipment),
          })
        );
      });
    }

    this.accordionForm = new FormGroup({
      general_info: general_info,
      specify_your_issue: specify_your_issue,
    });
  }
}
