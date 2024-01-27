import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item, Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnDestroy {
  listaLivros: Livro[] = [];
  campoBusca: string = '';
  subscription: Subscription;
  livro: Livro;

  constructor(private livroService: LivroService) {}

  buscarLivros() {
    this.subscription = this.livroService.buscar(this.campoBusca).subscribe({
      next: (itens) => {
        this.listaLivros = this.livrosResultadoParaLivros(itens);
      },
      error: (err) => console.log(err),
    });
  }

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map((item) => {
      return new LivroVolumeInfo(item);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
