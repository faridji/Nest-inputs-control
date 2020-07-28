import { Component, Input } from '@angular/core';
import { Department } from './model';


@Component({
  selector: 'department-hierarchy-recursive',
  templateUrl: './department-hierarchy.component.html',
  styleUrls: ['./department-hierarchy.component.scss']
})
export class DepartmentHierarchyRecursiveComponent
{
    @Input() data: Department[];
    @Input() departments: Department[];

    constructor()
	{
        this.data = [];
        this.departments = [];
    }

    getDept(d: Department, dict: any, search: string)
    {
        if (d.value === search)
        {
            d.children.push({
                id: this.uuidv4(),
                value: dict.value, 
                has_sub_category: dict.has_sub_category, 
                parent_id: dict.parent_id, 
                parent_name: dict.parent.has_sub_category ? dict.parent.value : d.value,
                showTemplate: false, 
                level: dict.level,
                children: []
            });
        }
        else
        {
            if (d.hasOwnProperty('children') && d.children.length > 0)
            {
                for (let _d of d.children)
                    this.getDept(_d, dict, search);
            }
        }
    }    

    onAddRecord(input: HTMLInputElement, hasSubCategory: HTMLInputElement, parent: Department): void
    {
        if (input.value === null || input.value === '') return;
        let level = 0;
        parent.showTemplate = false;

        if (parent !== null)
        {
            if (parent.parent_id === null)
            {
                level = 1;
            }
            else
            {
                level = parent.has_sub_category ? parent.level + 1 : parent.level;
            }
        }

        let dict = {value: input.value, has_sub_category: hasSubCategory.checked, parent: parent, parent_id: parent.id, level: level};

        console.log('Comp to Add =', dict);
 
        for ( let dept of this.departments)
        {
            // If the record above of current record has sub_cetegories enabled then add this record to that one. otherwise 
            // add this record to the parent of the record above of it.
            let searchCriteria = dict.parent.value;

            if (!dict.parent.has_sub_category)
            {
                searchCriteria = dict.parent.parent_name;
            }

            if (dept.value === searchCriteria)
            {
                dept.children.push({
                    id: this.uuidv4(),
                    value: dict.value, 
                    has_sub_category: dict.has_sub_category, 
                    parent_id: dict.parent_id, 
                    parent_name: dict.parent.has_sub_category ? dict.parent.value : dept.value,
                    showTemplate: false, 
                    level: dict.level,
                    children: []
                });
            }
            else
            {
                for (let d of dept.children)
                {
                    this.getDept(d, dict, searchCriteria);
                }
            }
        };
    }

    onRemoveChildDept(dept: Department, deptToDelete: Department, parent: Department): void
    {
        let parentDept: Department = parent;

        if (dept.value === deptToDelete.value)
        {
            let index = parentDept.children.indexOf(deptToDelete);
            parentDept.children.splice(index, 1);
            return;
        }
        else
        {
            for (let d of dept.children)
            {
                this.onRemoveChildDept(d, deptToDelete, d);
            }
        }
    }

    onRemoveRecord(department: Department): void
    {
        let parentDept: Department = null;

        for (let dept of this.departments)
        {
            parentDept = dept;

            if (dept.value === department.value)
            {
                let index = parentDept.children.indexOf(department);
                parentDept.children.splice(index, 1);
                return;
            }

            else
            {
                for (let childDept of dept.children)
                {
                    this.onRemoveChildDept(childDept, department, parentDept);
                }
            }
        }
    }

    onShowTemplate(department: Department): void
    {
        for (let dept of this.data)
        {
            dept.showTemplate = false;
        }

        department.showTemplate = true;
    }
    
    getMarginLeft(dept: Department)
    {
        let margin: number = 20;
       
        return margin *= dept.level;
    }  

    getPadding(dept: Department)
    {
        // if (dept.has_sub_category && dept.children.length > 0)
        // {
        //     return 10
        // }

        // return 0;
    }    

    getBackgroundColor(dept: Department)
    {
        // let backgroundColor = "";

        // if (dept.has_sub_category && dept.parent_id !== null)
        // {
        //     backgroundColor = this.getRandomColor();
        // }

        // return backgroundColor;
    }

    getRandomColor() 
    {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    uuidv4() 
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }  
}
