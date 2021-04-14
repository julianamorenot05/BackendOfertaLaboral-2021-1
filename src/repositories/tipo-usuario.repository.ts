import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MonodbdsDataSource} from '../datasources';
import {TipoUsuario, TipoUsuarioRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class TipoUsuarioRepository extends DefaultCrudRepository<
  TipoUsuario,
  typeof TipoUsuario.prototype._id,
  TipoUsuarioRelations
> {

  public readonly usuarios: HasManyRepositoryFactory<Usuario, typeof TipoUsuario.prototype._id>;

  constructor(
    @inject('datasources.monodbds') dataSource: MonodbdsDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(TipoUsuario, dataSource);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
