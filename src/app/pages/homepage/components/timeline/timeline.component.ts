import { Component, OnInit } from '@angular/core'

@Component({
    templateUrl: "timeline.html",
    styleUrls: ["timeline.css"],
    selector: "app-timeline"
})
export class TimelineComponent implements OnInit {
    orcamentoViagem = 6000;
    diasDeViagem = 32;

    infos = [
        { titulo: "Abastecimento", valor: 200.00, local: "KM32 - Rio de Janeiro, RJ", stickers: [
            { id: 1, titulo: "Despesa", color: "#c0392b" },
            { id: 2, titulo: "Abastecimento", color: "#d35400" }
        ], day: "03/08/2020", description: "Abastecimento feito para iniciar a viagem."},
        { titulo: "Abastecimento", valor: 200.00, local: "Lorena, São Paulo - SP", stickers: [
            { id: 1, titulo: "Despesa", color: "#c0392b" },
            { id: 2, titulo: "Abastecimento", color: "#d35400" }
        ], day: "03/08/2020", description: "Segundo abastecimento realizado durante o decorrer da viagem."},
        { titulo: "Hospedagem", valor: 100.00, local: "Aparecida do Norte, São Paulo - SP", stickers: [
            { id: 1, titulo: "Despesa", color: "#c0392b" },
            { id: 3, titulo: "Hotelaria", color: "#2980b9" },
        ], day: "03/08/2020", description: "Hospedagem para um dia em hotel 4 estrelas."},
        { titulo: "Jantar no Hotel", valor: 60.00, local: "Hotel Agape, Aparecida - SP", stickers: [
            { id: 1, titulo: "Despesa", color: "#c0392b" },
            { id: 3, titulo: "Hotelaria", color: "#2980b9" },
            { id: 4, titulo: "Alimentação", color: "#f39c12" },
        ], day: "03/08/2020", description: "Jantar para duas pessoas em Hotel."}
    ]

    filters = [
        { id: 1, titulo: "Despesa", selected: false },
        { id: 2, titulo: "Abastecimento", selected: false },
        { id: 3, titulo: "Hotelaria", selected: false },
        { id: 4, titulo: "Alimentação", selected: false },
    ];

    viewTimelapse = true;

    ngOnInit() {
        console.log(this.viewTimelapse);
    }

    setFilter(val: number) {
        var item = this.filters.find(e=>e.id == val);
        item.selected = !item.selected;
    }

    get total() {
        return this.infos.map(e=>e.valor).reduce((prev, next) => {
            return prev + next
        });
    }

    get mediaDiaria() {
        return this.orcamentoViagem / this.diasDeViagem;
    }

    get filtersNonSelected() {
        var res = this.filters.filter((e) => e.selected == false);
        return res;
    }

    get filterSelected() {
        return this.filters.filter((e) => e.selected == true);
    }

    get infosFiltered() {
        if(this.filterSelected.length == 0)
            return this.infos;
        else
            return this.infos.filter((e) => e.stickers.some(z=> this.filterSelected.map(e=>e.id).includes(z.id)));
    }
}