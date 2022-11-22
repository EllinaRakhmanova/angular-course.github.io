import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { RecipeModal } from "./recipe.modal";

import { DataStorageService } from "../../shared/data-storage.service";
import { RecipeService } from "./recipe.service";

@Injectable()
export class RecipeResolverService implements Resolve<RecipeModal[]>{
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();

    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes()
    } else {
      return recipes;
    }
  }
}
