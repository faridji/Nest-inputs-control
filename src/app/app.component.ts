import { Component } from '@angular/core';
import { Department } from './department-hierarchy-recursive/model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent 
{
    postComments: any[];
    departments: Department[];

	constructor()
	{
        this.departments = [];

        this.departments = [{ "id": "7b6ae11c-45d0-4877-9e8d-a8fcfe6581e6", "value": "Hospital", "has_sub_category": true, "parent_id": null, "parent_name": null, "showTemplate": false, "level": 0, "children": [ { "id": "3fcaae38-1a81-4d88-90b5-cd0b079d6acc", "value": "OPD", "has_sub_category": true, "parent_id": "7b6ae11c-45d0-4877-9e8d-a8fcfe6581e6", "parent_name": "Hospital", "showTemplate": false, "level": 1, "children": [ { "id": "64a2aafe-fc0f-4886-8115-604f47c43605", "value": "Dental", "has_sub_category": false, "parent_id": "3fcaae38-1a81-4d88-90b5-cd0b079d6acc", "parent_name": "OPD", "showTemplate": false, "level": 2, "children": [] }, { "id": "d993c519-1451-4f78-b615-4f63be5d01dd", "value": "Cardiology", "has_sub_category": false, "parent_id": "64a2aafe-fc0f-4886-8115-604f47c43605", "parent_name": "OPD", "showTemplate": false, "level": 2, "children": [] }, { "id": "3d250e29-e68a-458c-a03b-c01692fb9702", "value": "Orthopedic", "has_sub_category": false, "parent_id": "d993c519-1451-4f78-b615-4f63be5d01dd", "parent_name": "OPD", "showTemplate": false, "level": 2, "children": [] }, { "id": "62f7df6c-6de1-4977-bc1c-b04526d42d14", "value": "Consultant", "has_sub_category": false, "parent_id": "3d250e29-e68a-458c-a03b-c01692fb9702", "parent_name": "OPD", "showTemplate": false, "level": 2, "children": [] }, { "id": "1a51e711-5133-411d-8289-bd98b3a149f5", "value": "ENT", "has_sub_category": false, "parent_id": "62f7df6c-6de1-4977-bc1c-b04526d42d14", "parent_name": "OPD", "showTemplate": false, "level": 2, "children": [] }, { "id": "3b59b11e-0faa-4562-adc9-67b907f71dc9", "value": "Gynae", "has_sub_category": false, "parent_id": "1a51e711-5133-411d-8289-bd98b3a149f5", "parent_name": "OPD", "showTemplate": false, "level": 2, "children": [] }, { "id": "69030123-d094-484e-95d1-f421c265cce8", "value": "Gastroenterology", "has_sub_category": false, "parent_id": "3b59b11e-0faa-4562-adc9-67b907f71dc9", "parent_name": "OPD", "showTemplate": false, "level": 2, "children": [] }, { "id": "d03457d1-646e-4132-9adb-3c8634f23c67", "value": "Cosmetic Physician", "has_sub_category": false, "parent_id": "69030123-d094-484e-95d1-f421c265cce8", "parent_name": "OPD", "showTemplate": false, "level": 2, "children": [] }, { "id": "20f1fba1-fee8-4566-94f7-c7786cd1c740", "value": "PEADS", "has_sub_category": false, "parent_id": "d03457d1-646e-4132-9adb-3c8634f23c67", "parent_name": "OPD", "showTemplate": false, "level": 2, "children": [] }, { "id": "b157c869-356e-4067-9311-6796c6c620b7", "value": "General Surgery", "has_sub_category": true, "parent_id": "20f1fba1-fee8-4566-94f7-c7786cd1c740", "parent_name": "OPD", "showTemplate": false, "level": 2, "children": [ { "id": "d0be4435-5493-4869-bf31-bfb775da6cd0", "value": "Plastic Surgery", "has_sub_category": false, "parent_id": "b157c869-356e-4067-9311-6796c6c620b7", "parent_name": "General Surgery", "showTemplate": false, "level": 3, "children": [] } ] } ] }, { "id": "ff1c6110-0755-4d8e-9429-212971ec7808", "value": "Emergency", "has_sub_category": true, "parent_id": "7b6ae11c-45d0-4877-9e8d-a8fcfe6581e6", "parent_name": "Hospital", "showTemplate": false, "level": 1, "children": [ { "id": "01de1065-4a89-4f33-b3f2-9c7e47ae68c7", "value": "Accidents", "has_sub_category": false, "parent_id": "ff1c6110-0755-4d8e-9429-212971ec7808", "parent_name": "Emergency", "showTemplate": false, "level": 2, "children": [] }, { "id": "9182abf3-4d3d-4fc6-8d3a-95c44dfc4d1e", "value": "Fire", "has_sub_category": false, "parent_id": "01de1065-4a89-4f33-b3f2-9c7e47ae68c7", "parent_name": "Emergency", "showTemplate": false, "level": 2, "children": [] } ] } ] }]
    }
    
    onAddRecord(input: HTMLInputElement, hasSubCategory: HTMLInputElement, parent: Department): void
    {
        console.log('parent in APP =', parent);

        if (input.value === null || input.value === '') return;

        for (let dept of this.departments)
        {
            dept.showTemplate = false;
        }

        let level = 0;

        if (parent !== null)
        {
            if (parent.parent_id === null)
            {
                level = 1;
            }
        }

        if (parent !== null)
        {
            for (let rec of this.departments)
            {
                if (rec.id === parent.id)
                {
                    rec.children.push({
                        id: this.uuidv4(),
                        value: input.value, 
                        has_sub_category: hasSubCategory.checked,
                        parent_id: parent.id, 
                        parent_name: parent ? parent.value : null, 
                        showTemplate: false,
                        level: level,

                        children: []
                    })
                }
            }
        }
        else
        {
            this.departments.push({
                id: this.uuidv4(),
                value: input.value, 
                has_sub_category: hasSubCategory.checked,
                parent_id: null, 
                parent_name: null, 
                showTemplate: false,
                level: level,
                
                children: []
            });
        }
    }

    onRemoveRecord(department: Department): void
    {
        if (department.parent_id === null)
        {
            this.departments = [];
            return;
        }
    }

    getMarginLeft(dept: Department)
    {
        let margin: number = 20;
       
        return margin *= dept.level;
    }  

    onShowTemplate(department: Department): void
    {
        for (let dept of this.departments)
        {
            dept.showTemplate = false;
        }

        department.showTemplate = true;
    }

    getBackgroundColor(dept: Department)
    {
        if (dept.parent_id === null)
        {
            return 'lightgray';
        }
    }

    onGetData(): void
    {
        console.log('Depts =', this.departments)
    }

    uuidv4() 
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }      
}
