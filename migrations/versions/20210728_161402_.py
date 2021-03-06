"""empty message

Revision ID: 1484de8351c5
Revises: 5eb3262886bd
Create Date: 2021-07-28 16:14:02.816366

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1484de8351c5'
down_revision = '5eb3262886bd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('image', sa.String(), nullable=True),
    sa.Column('listing_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['listing_id'], ['listings.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('image')
    )
    op.drop_column('listings', 'images')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('listings', sa.Column('images', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.drop_table('images')
    # ### end Alembic commands ###
